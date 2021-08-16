export interface AddCart {
    productId: String,
    qty: Number,
};

export interface UpdateCart {
    qty: Number,
};

export interface CartData {
    productName: String,
    productDescription: String,
    productId: String,
    productPrice: Number,
    qty: Number,
    _id: String
};