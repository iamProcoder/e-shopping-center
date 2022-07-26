import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import {  useAppDispatch, useAppSelector } from '../redux/hooks';
import { enteranceUser, loggedIn, userInfoByRefToken } from '../redux/user/authSlice';
import Auth from "../pages/Auth";
import { IUser } from "../models/UserModel";
import { UserInfoByToken } from "../services/user.service";

const useAuth = (): boolean => {
  const dispatch = useAppDispatch();
  const refreshToken = localStorage.getItem('refreshToken') || '';  
  const { user, loading } = UserInfoByToken(refreshToken!);
  
  useEffect(() => {
    dispatch(userInfoByRefToken(user));
  }, [loading, user, dispatch]);
  const isLoggedIn = useAppSelector<boolean>(loggedIn);
  const isUser = useAppSelector<IUser>(enteranceUser) ? true : false;
  
  return isLoggedIn && isUser;
};

const ProtectedRoutes = () => {  
  const [isAuth, setIsAuth] = useState<boolean>(false);
  let location = useLocation();

  let _isAuth: boolean = useAuth();
  useEffect(() => {
    setIsAuth(_isAuth);
  }, [_isAuth]);
  
  return isAuth ? <Outlet /> : <Auth />;
}

export default ProtectedRoutes