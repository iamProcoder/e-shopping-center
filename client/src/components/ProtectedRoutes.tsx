import { Outlet, useLocation } from "react-router-dom";
import Auth from "../pages/Auth";

const useAuth = () => {
  const isLoggedIn = true;
  return isLoggedIn; 
}

const ProtectedRoutes = () => {
  let location = useLocation();
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Auth />;
}

export default ProtectedRoutes