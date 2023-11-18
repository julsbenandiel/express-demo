import * as express from 'express';
import ProductController from "./product/controller"

const router = express.Router();

router.use("/product", ProductController.router)

export default router;