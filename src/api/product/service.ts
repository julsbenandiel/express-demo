import ProductRepository from "./repository";

class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository()
  }

  async getProducts(searchParams: Record<string, any>) {
    try {
      const params = new URLSearchParams(searchParams)
      const limit: number = 18;
      const page: number = params.get('page') ? (Number(params.get('page')) - 1) : 0;
      const offset = page * limit;

      const sort: Record<string, any> = {} 
      const filters: Record<string, any> = {}

      if (params.get('name'))
        filters['name'] = {
          $regex: new RegExp(params.get('name'), 'i')
        }

      if (params.get('brand'))
        filters['brandName'] = params.get('brand')

      if (params.get('category'))
        filters['category'] = params.get('category')

      if (params.get('sort')) {
        const [sortBy, order] = params.get('sort').split(":")
        sort[sortBy] = order
      } else {
        sort['stock'] = -1
      }

      const data = await this.repository.list({ limit, offset, filters, sort })
      const pageCount = Math.ceil(data.total / limit)

      return {
        metadata: {
          page: page + 1,
          pageCount,
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