import { Schema, model, Document, Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Cart extends Document {
    productId: string;
    qty?: Number,
}
// 2. Create a Schema corresponding to the document interface.
const cartSchema: Schema = new Schema({
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product'},
    qty: { type: Number, default: 1}
},
    {
        timestamps: true
    }
);

// 3. Create a Model.
const CartModel: Model<Cart> = model<Cart>('Cart', cartSchema);
export default CartModel;