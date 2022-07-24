import { useEffect} from 'react'
import { Link } from 'react-router-dom';

import { IUser } from '../models/UserModel';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loggedIn, enteranceUser, userInfoByRefToken } from '../redux/user/authSlice';
import { UserInfoByToken } from '../services/user.service';
import Logout from './Logout';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector<boolean>(loggedIn);
  
  const refreshToken = localStorage.getItem('refreshToken') || '';  
  const { user, loading } = UserInfoByToken(refreshToken!);
  
  useEffect(() => {
    dispatch(userInfoByRefToken(user));
  }, [loading, user, dispatch]);
  const userName = useAppSelector<IUser>(enteranceUser)?.name;

  return (
    <nav className="flex justify-between border-b border-solid border-gray-400 items-center p-3">
      <div>
        <Link to="/" className="flex">
          <div className="font-bold flex items-center hover:text-gray-500">
            e-Shopping Center
          </div>
        </Link>
      </div>

      <div className="flex">
        {isLoggedIn && (
          <>
            <span className="mr-5">{userName}</span>
            <Link to="/profile">Profile</Link>
            <Link className="ml-5" to="/order-card">Order</Link>
            <Logout />
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar