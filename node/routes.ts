import { Request, Response, Router } from "express";
import cartRouter from "./modules/carts/carts.routes";

const router: Router = Router();
// Adding all sub routes
import categoryrouter from './modules/categories/categories.routes';
import productRouter from './modules/products/products.routes';
router.use('/categories', categoryrouter);
router.use('/products', productRouter);
router.use('/carts', cartRouter);

// If no matched routes were found
router.get('*', (req: Request, res: Response) => {
    res.status(400).send('No Routes found!');
});

export default router;