import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

export default class ValidatePostData {
    validateBody = (validateModel: any) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const classData = new validateModel(req);
                const validateData: ValidationError[] = await validate(classData);
                // Below block will execute when validation failed
                if (validateData && validateData.length > 0) {
                    const errorMessages = this.parseValidationError(validateData);
                    return res.status(400).send({
                        error: errorMessages[0]
                    });
                } else {
                    return next();
                }
            } 
            catch(e) {
                return res.status(400).send({
                    error: 'Something went wrong!'
                });
            }
        }
    }

    private parseValidationError = (errors: ValidationError[]) => {
        let errorMsgs = [];
        for (let error of errors) {
            for (let msg in error.constraints) {
                if (error.constraints.hasOwnProperty(msg))
                    errorMsgs.push(error.constraints[msg]);
            }
        }
        return errorMsgs;
    }
}