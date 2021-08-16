import { Min, MinLength } from "class-validator";
import { Request } from "express";

export class NewProduct {
    
    @MinLength(3, {
        message: 'Product name must have minimum 3 character'
    })
    productName: string;

    @MinLength(3, {
        message: 'Product description must have minimum 10 character'
    })
    productDescription: string;

    @Min(0.1, {
        message: 'Product price must be greater than 0'
    })
    productPrice: string;

    @Min(1, {
        message: 'Product unit must be greater than 0'
    })
    productUnit: string;

    constructor(req: Request) {
        this.productName = req.body.productName;
        this.productDescription = req.body.productDescription;
        this.productPrice = req.body.productPrice;
        this.productUnit = req.body.productUnit;
    }
}