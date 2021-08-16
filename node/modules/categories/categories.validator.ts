import { MinLength } from "class-validator";
import { Request } from "express";

export class NewCategory {
    
    @MinLength(3, {
        message: 'Category name must have minimum 3 character'
    })
    categoryName: string;

    constructor(req: Request) {
        this.categoryName = req.body.categoryName;
    }
}