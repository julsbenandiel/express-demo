import { Product } from "./interface";
import ProductSchema from "./model";

class ProductRepository {
  private model = ProductSchema;

  list = async ({ offset, limit, filters, sort }) => {
    try {
      const products = await this.model
        .find(filters)
        .sort(sort)
        .limit(limit ?? 20)
        .skip(offset ?? 0)

      const total = await this.model.count(filters)

      return {
        total,
        products
      };
      
    } catch (error) {
      throw new Error(error)
    }
  }
  
  getBrands = async () => {
    try {
      const data = await this.model.aggregate([
        {
          $group: {
            _id: "$brandName",
          }
        },
      ])

      return data;
      
    } catch (error) {
      throw new Error(error)
    }
  }

  getCategories = async () => {
    try {
      const data = await this.model.aggregate([
        {
          $group: {
            _id: "$category",
          }
        },
      ])

      return data;
      
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default ProductRepository;