import { Mongoose } from "mongoose";
import { AddCategory, CategoriesData } from "../../interfaces/category.interface";
import { DBActionResponse } from "../../interfaces/db-action.interface";
import { AddProduct, ProductData } from "../../interfaces/product.interface";
// import schema
import ProductModel from "../../models/product.model";

export default class ProductService {
    
    public readonly getProducts = async (): Promise<ProductData[]> => {
        try {
            // Fetching records from the DB
            return await ProductModel.find({}) as ProductData[];
        } catch(e) {
            // In case of error returning empty product data
            return [] as ProductData[];
        }
    }

    public addNewProduct = async (productData: AddProduct): Promise<DBActionResponse>   => {
        try {
            //Insert new product data into db
            const newProduct = new ProductModel(productData);
            const resp = await newProduct.save();
            return {
                hasError: false
            }
        } catch(e) {
            return {
                hasError: true
            }
        }
    }

    public deleteProductById = async  (productId: String): Promise<DBActionResponse>  => {
        try {
            // Fetching records from the DB
            const resp = await ProductModel.deleteOne({_id: productId});
            return {
                hasError: false
            };
        } catch(e) {
            // In case of error returning empty product data
            return {
                hasError: true
            };
        }
    }
}