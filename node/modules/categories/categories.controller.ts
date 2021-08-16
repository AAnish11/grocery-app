import { Request, Response } from "express";
import { AddCategory, CategoriesData } from "../../interfaces/category.interface";
import { DBActionResponse } from "../../interfaces/db-action.interface";
import CategoryService from "./categories.service";

export default class  CategoryController {
    categoryService: CategoryService;
    constructor() {
        // Initiate object
        this.categoryService = new CategoryService();
    }

    public readonly getCategoriesList = async (req: Request, res: Response) => {
        // Fetch Exsiting Categories 
        const categories: CategoriesData[] = await this.categoryService.getCategories();
        res.send(categories)
    }

    public readonly addCategory = async (req: Request, res: Response) => {
        // Prepare Insert Object
        const insertBody: AddCategory = {
            categoryName: req.body.categoryName
        };
        // Add New Categories Record
        const resp: DBActionResponse = await this.categoryService.addNewCategory(insertBody);
        if (resp.hasError) {
            res.status(400).send({
                error: 'Something went wrong!'
            });
        } else {
            res.send({
                message: 'Category successfully added!'
            });
        }
    }
    
}