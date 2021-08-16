import { Min, MinLength } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AddCart, CartData } from "../../interfaces/cart.interface";
import CartModel from "../../models/cart.model";
import ProductModel from "../../models/product.model";

export default class CartMiddleware {

    public validateProductId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // If productId not provided
            const { productId } = req.params;
            const isProductExists = await ProductModel.findById(productId);
            if (isProductExists === null) {
                throw Error('Invalid');
                return;
            }
            next();
        } catch (err) {
            return res.status(400).send(
                {
                    error: 'Invalid product id provided'
                }
            );
        }
    }

    public isItemExistsInCart = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // If productId not provided
            const { productId } = req.params;
            const isProductExists = await CartModel.findOne({productId}) as (CartData | null);
            req.body.qty = isProductExists ? +isProductExists.qty + 1 : 1;
            req.body.productId = productId;
            req.body.cartId = isProductExists ? isProductExists._id : '';
            next();
        } catch (err) {
            return res.status(400).send(
                {
                    error: 'Invalid product id provided'
                }
            );
        }
    }
    
}