import { Request, Response } from "express";
import { DBActionResponse } from "../../interfaces/db-action.interface";
import { AddProduct } from "../../interfaces/product.interface";
import ProductService from "./products.service";

export default class  ProductController {
    productService: ProductService;
    constructor() {
        this.productService = new ProductService();
    }
    // List All Products -  Handler
    public readonly getAllProducts = async (req: Request, res: Response) => {
        const resp = await this.productService.getProducts();
        res.send(resp);
    }
    // Add New Product -  Handler
    // Expecting {formData} in param
    public addProduct = async (req: Request, res: Response) => {
        // Prepare Insert Body
        const { productName, productDescription, productPrice, productUnit, categoryId  } = req.body;
        const addProduct: AddProduct = {
            productName, 
            productDescription, 
            productPrice, 
            productUnit, 
            categoryId
        }
        const resp: DBActionResponse = await this.productService.addNewProduct(addProduct);
        if (resp.hasError) {
            res.status(400).send({
                error: 'Something went wrong!'
            });
        } else {
            res.send({
                message: 'Product successfully added!'
            });
        }
    }
    // Delete Product By Id -  Handler
    // Expecting {id} in param
    public deleteProductById = async (req: Request, res: Response) => {
        const deleteProduct = await this.productService.deleteProductById(req.params.productId);
        console.log(deleteProduct);
        res.send({
            message: 'Product Successfully deleted!'
        });
    }
}