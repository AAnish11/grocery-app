import { Request, Response } from "express";
import { AddCart, CartData } from "../../interfaces/cart.interface";
import { DBActionResponse } from "../../interfaces/db-action.interface";
import { AddProduct } from "../../interfaces/product.interface";
import CartService from "./carts.service";

export default class  CartController {
    cartService: CartService;
    constructor() {
        this.cartService = new CartService();
    }
    // List All Products -  Handler
    public readonly getCartItems = async (req: Request, res: Response) => {
        const cartData: CartData[] = await this.cartService.getCartItems();
        res.send(cartData);
    }
    // Add New Product -  Handler
    // Expecting {formData} in param
    public updateItemToCart = async (req: Request, res: Response) => {
        const { qty, cartId } = req.body;
        const cartItem: AddCart = {
            productId: req.body.productId,
            qty
        };
        // If Item in cart than update it
        let resp: DBActionResponse;
        if (qty < 2) {
            resp = await this.cartService.addItemToCart(cartItem);
        } else {
            resp = await this.cartService.updateItemInCart(cartId, { qty } );
        }
        // Send back response to request
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
    public deleteCartItem = async (req: Request, res: Response) => {
        const resp: DBActionResponse = await this.cartService.deleteCartItemById(req.params.cartId);
        if (resp.hasError) {
            res.status(400).send({
                error: 'Something went wrong!'
            });
        } else {
            res.send({
                message: 'Product successfully Removed!'
            });
        }
    }
}