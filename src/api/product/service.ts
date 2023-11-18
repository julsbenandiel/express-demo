import ProductRepository from "./repository";

class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository()
  }

  async getProducts(searchParams: Record<string, any>) {
    try {
      const params = new URLSearchParams(searchParams)
      const limit: number = 20;
      const page: number = params.get('page') ? (Number(params.get('page')) - 1) : 0;
      const offset = page * limit;

      const sort: Record<string, any> = {} 
      const filters: Record<string, any> = {}

      if (params.get('name'))
        filters['name'] = {
          $regex: new RegExp(params.get('name'), 'i')
        }

      if (params.get('filter')) {
        const [filterBy, value] = params.get('filter').split(":")
        filters[filterBy] = value
      }

      if (params.get('sort')) {
        const [sortBy, order] = params.get('sort').split(":")
        sort[sortBy] = order
      }

      const data = await this.repository.list({ limit, offset, filters, sort })

      return {
        metadata: {
          page: page + 1,
          total: data.total
        },
        products: data.products
      };
      
    } catch (error) {
      throw new Error(error)
    }
  }

  getBrands = async () => {
    try {
      const brads = await this.repository.getBrands()
      return brads.map((b) => b._id);
      
    } catch (error) {
      throw new Error(error)
    }
  }
  
  getCategories = async () => {
    try {
      const categories = await this.repository.getCategories()
      return categories.map((c) => c._id);
      
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default ProductService;