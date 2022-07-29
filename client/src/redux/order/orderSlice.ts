import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IProduct } from '../../models/ProductModel';
import { ICart } from '../../models/CartModel';

export interface IOrderState {
  carts: ICart[];
  cartNumber: number,
  addCartAlert: boolean,
  removeCartAlert: boolean,
}

const initialState: IOrderState = {
  carts: [],
  cartNumber: 0,
  addCartAlert: false,
  removeCartAlert: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<IProduct>) => {
      if (state.cartNumber === 0) {
        const cart = { product: action.payload, quantity: 1 };
        state.carts.push(cart);
      } else {
        let checkAddProduct: boolean = false;
        state.carts.map(( {product}, index ) => {
          if (product.id === action.payload.id) {
              state.carts[index].quantity++;
              checkAddProduct=true;
          }
        });

        if (!checkAddProduct) {
          const cart = { product: action.payload, quantity: 1 };
          state.carts.push(cart);
        }
      }

      state.carts = [...state.carts];
      state.cartNumber = state.cartNumber + 1;
      state.addCartAlert = true;
    },
    removeCart: (state, action: PayloadAction<number>) => {
      const quantity_ = state.carts[action.payload].quantity;
      
      state.cartNumber = state.cartNumber - quantity_;
      state.carts = state.carts.filter(( {product} ) => product.id !== state.carts[action.payload].product.id);
      state.removeCartAlert = true;
    },
    increaseQuantity : (state, action: PayloadAction<number>) => {
      const quantity_ = state.carts[action.payload].quantity;
      state.cartNumber = state.cartNumber + quantity_ ;
      state.carts[action.payload].quantity++;
    },
    decreaseQuantity : (state, action: PayloadAction<number>) => {
      const quantity_ = state.carts[action.payload].quantity;
      if(quantity_ > 1) {
        state.cartNumber = state.cartNumber - quantity_;
        state.carts[action.payload].quantity--;
      }
    },

  }
});

export const { addCart, removeCart, increaseQuantity, decreaseQuantity } = orderSlice.actions;

export const addCartAlert = (state: RootState) => state.order.addCartAlert;
export const removeCartAlert = (state: RootState) => state.order.removeCartAlert;
export const cartList = (state: RootState) => state.order.carts;
export const totalCartCount = (state: RootState) => state.order.carts.length;

export default orderSlice.reducer;
