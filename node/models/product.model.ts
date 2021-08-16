import { Schema, model, Document, Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Product extends Document {
    productName: String;
    productDescription: String;
    productPrice: Number;
    productUnit: Number;
    categoryId: String;
}

// 2. Create a Schema corresponding to the document interface.
const productSchema: Schema = new Schema({
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productUnit: { type: Number, required: true },
    categoryId: { required: true, type: Schema.Types.ObjectId, ref: 'Category' },
},
    {
        timestamps: true
    }
);

// 3. Create a Model.
const ProductModel: Model<Product> = model<Product>('Product', productSchema);
export default ProductModel;