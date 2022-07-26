import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import orderReducer from './order/orderSlice';
import authReducer from './user/authSlice';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    auth: authReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
