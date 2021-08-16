import { Mongoose } from "mongoose";
import { AddCategory, CategoriesData } from "../../interfaces/category.interface";
import { DBActionResponse } from "../../interfaces/db-action.interface";
// import schema
import CategoryModel from "../../models/category.model";

export default class CategoryService {
    constructor() {
    }

    public addNewCategory = async (categoryData: AddCategory):Promise<DBActionResponse>   => {
        try {
            //Insert new category into db
            const newCatObj = new CategoryModel(categoryData);
            const resp = await newCatObj.save();
            return {
                hasError: false
            }
        } catch(e) {
            return {
                hasError: true
            }
        }
    } 
    public readonly getCategories = async ():Promise<CategoriesData[]> => {
        try {
            // Fetching records from the DB
            return await CategoryModel.find({}) as CategoriesData[];
        } catch(e) {
            // In case of error returning empty categories data
            return [] as CategoriesData[];
        }
    }
}