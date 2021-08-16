import { Router } from "express";
import CartController from "./carts.controller";
import CartMiddleware from "./carts.middleware";


const cartRouter: Router = Router();
const cartMiddleware: CartMiddleware = new CartMiddleware();
const cartController: CartController = new CartController();

cartRouter.get('/', cartController.getCartItems);

// Add/Update cart item data
const addCartRoutes = [
    cartMiddleware.validateProductId, 
    cartMiddleware.isItemExistsInCart, 
    cartController.updateItemToCart
]
cartRouter.post('/:productId', addCartRoutes);
cartRouter.delete('/:cartId', cartController.deleteCartItem);

export default cartRouter;