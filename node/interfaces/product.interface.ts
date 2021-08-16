export interface AddProduct {
    productName: String,
    productDescription: String,
    productPrice: Number,
    productUnit: Number,
    categoryId: String,
};

export interface ProductData {
    productName: String,
    productDescription: String,
    productPrice: Number,
    productUnit: Number,
    categoryId: String,
    _id: string
}