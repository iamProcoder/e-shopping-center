import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home';
import NoFoundPage from '../pages/NoFoundPage';
import OrderCard from '../pages/OrderCard';
import ProductDetail from '../pages/ProductDetail';
import Products from '../pages/Products';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';

import ProtectedRoutes from './ProtectedRoutes';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />}>
            <Route path="/" element={<Products />}>
              <Route path="/product-detail/:id" element={<ProductDetail />} />
            </Route>
            <Route path="/order-card" element={<OrderCard />} />
            <Route path="/profile" element={<Profile />} />            
          </Route>
        </Route>
        <Route path='*' element={<NoFoundPage />} />
      </Routes>
    </>
  );
};

export default Router