import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import {  useAppSelector } from '../redux/hooks';
import { loggedIn } from '../redux/user/authSlice';
import Auth from "../pages/Auth";

const useAuth = (): boolean => {
  const isLoggedIn = useAppSelector<boolean>(loggedIn);
  return isLoggedIn;
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