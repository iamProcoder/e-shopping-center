import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser } from '../../models/UserModel';

export interface AuthState {
  loggedIn: boolean;
  user: any;
}

const initialState: AuthState = {
  loggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state) => {
      state.loggedIn = true;
    },
    logoutUser: (state) => {
      debugger;
      state.loggedIn = false;
      state.user = null;
    },
    userInfoByRefToken: (state, action: PayloadAction<IUser>) => {
      debugger;
      state.user = action.payload;
    }
  }
});

export const { loginUser, logoutUser, userInfoByRefToken } = authSlice.actions;

export const loggedIn = (state: RootState) => state.auth.loggedIn;
export const enteranceUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
