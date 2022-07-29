import { IProduct } from "./ProductModel";

export interface ICart {
    product: IProduct, 
    quantity: number
}