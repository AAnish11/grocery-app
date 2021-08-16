import { Schema, model, Document, Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Category extends Document {
    categoryName: string;
}

// 2. Create a Schema corresponding to the document interface.
const categorySchema: Schema = new Schema({
    categoryName: { type: String, required: true },
},
    {
        timestamps: true
    }
);

// 3. Create a Model.
const CategoryModel: Model<Category> = model<Category>('Category', categorySchema);
export default CategoryModel;