import { Mongoose } from "mongoose";
import { DBActionResponse } from "../../interfaces/db-action.interface";
import { AddCart, CartData, UpdateCart } from "../../interfaces/cart.interface";
// import schema
import CartModel from "../../models/cart.model";

export default class CartService {

    public readonly getCartItems = async (): Promise<CartData[]> => {
        try {
            // Fetching records from the DB
            const cartItems = await CartModel.find({}).populate('productId');
            const modifiedCartItems: CartData[]  = [];
            cartItems.forEach(cart => {
                if (cart.productId) {
                    const { productName, productDescription, _id, productPrice,  } = cart.productId as any;
                    const newObj =  {
                        productName: productName,
                        productDescription: productDescription,
                        productId: _id,
                        productPrice: productPrice,
                        qty: cart.qty,
                        _id: cart._id
                    };
                    modifiedCartItems.push(newObj); 
                }
            });
            return modifiedCartItems;
        } catch (e) {
            console.log(e);
            // In case of error returning empty product data
            return [] as CartData[];
        }
    }

    public addItemToCart = async (cartItem: AddCart): Promise<DBActionResponse> => {
        try {
            //Insert new product data into db
            const cartItemObj = new CartModel(cartItem);
            const resp = await cartItemObj.save();
            return {
                hasError: false
            }
        } catch (e) {
            return {
                hasError: true
            }
        }
    }

    public deleteCartItemById = async (cartId: String): Promise<DBActionResponse> => {
        try {
            // Fetching records from the DB
            const resp = await CartModel.deleteOne({ _id: cartId });
            return {
                hasError: false
            };
        } catch (e) {
            // In case of error returning empty product data
            return {
                hasError: true
            };
        }
    }

    public updateItemInCart = async (cartId: String, cartItem: UpdateCart): Promise<DBActionResponse> => {
        try {
            //Insert new product data into db
            const cartItemObj = await CartModel.updateOne({ _id: cartId }, { $set: { qty: cartItem.qty } });
            console.log(cartItemObj);
            return {
                hasError: false
            }
        } catch (e) {
            return {
                hasError: true
            }
        }
    }

}