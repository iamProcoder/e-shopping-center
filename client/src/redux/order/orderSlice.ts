import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser } from '../../models/UserModel';

export interface OrderState {
  loggedIn: boolean;
  user: any;
}

const initialState: OrderState = {
  loggedIn: false,
  user: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<IUser>) => {
      state.loggedIn = true;
    },
    removeCard: (state, action: PayloadAction<IUser>) => {
      state.loggedIn = false;
      state.user = null;
    }
  }
});

export const { addCard, removeCard } = orderSlice.actions;

export const loggedIn = (state: RootState) => state.order.loggedIn;
export const enteranceUser = (state: RootState) => state.order.user;

export default orderSlice.reducer;
