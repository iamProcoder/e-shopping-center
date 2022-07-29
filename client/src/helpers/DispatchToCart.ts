import { IProduct } from '../models/ProductModel';
import { addCart } from '../redux/order/orderSlice';
export const AddCart = (dispatch: any, product: IProduct) => dispatch(addCart(product));
