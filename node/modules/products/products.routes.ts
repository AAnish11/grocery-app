import { Router } from "express";
import ProductController from "./products.controller";
import ValidatePostData from "../../validator";
import { NewProduct } from "./products.validator";

const v: ValidatePostData = new ValidatePostData();

const productRouter: Router = Router();

const productController: ProductController = new ProductController();

productRouter.get('/', productController.getAllProducts);
productRouter.post('/', v.validateBody(NewProduct), productController.addProduct);
productRouter.delete('/:productId', productController.deleteProductById);

export default productRouter;