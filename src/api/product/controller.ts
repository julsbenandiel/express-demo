import { NextFunction, Router, Request, Response } from "express";
import ProductService from "./service";
import BaseController from "../../lib/base-controller";

class ProductController extends BaseController {
  private service: ProductService;

  constructor() {
    super()
    this.service = new ProductService()
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get("/", this.fetchProducts)
    this.router.get("/brands", this.fetchBrands)
    this.router.get("/categories", this.fetchCategories)
  }

  public fetchProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = req.query
      const data = await this.service.getProducts(filters)

      res.status(200).json(data)
      
    } catch (error) {
      next(error)
    }
  }

  public fetchBrands = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const brands = await this.service.getBrands()
      res.status(200).json({ brands })
      
    } catch (error) {
      next(error)
    }
  }

  public fetchCategories = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.service.getCategories()
      res.status(200).json({ categories })
      
    } catch (error) {
      next(error)
    }
  }
}

export default new ProductController()