import { Router } from "express";
import CategoryController from "./categories.controller";
import ValidatePostData from "../../validator";
import { NewCategory } from "./categories.validator";
const categoryrouter = Router();
const categoryController = new CategoryController();

// Create Instance Of Validate Class
const v = new ValidatePostData();


categoryrouter.get('/', categoryController.getCategoriesList);
categoryrouter.post('/', v.validateBody(NewCategory),  categoryController.addCategory);

export default categoryrouter;