import { useState } from 'react'
import { Link } from 'react-router-dom';

import { IUser } from '../models/UserModel';
import { useAppSelector } from '../redux/hooks';
import { loggedIn, enteranceUser } from '../redux/user/authSlice';
import { totalCartCount } from '../redux/order/orderSlice';
import Logout from './Logout';

import { FaUser } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IoLogOutOutline } from 'react-icons/io5';
import { GiShoppingCart } from 'react-icons/gi';

const Navbar = () => {
  const [isAppear, setIsAppear]= useState<boolean>(false);
  const isLoggedIn = useAppSelector<boolean>(loggedIn);
  const user = useAppSelector<IUser>(enteranceUser);
  const totalCartNumber = useAppSelector<number>(totalCartCount);

  const handleClick = () => setIsAppear(!isAppear);

  return (
    <nav className="flex justify-between border-b border-solid border-gray-400 items-center p-3">
      <div>
        <Link to="/" className="flex">
          <div className="font-bold flex items-center hover:text-gray-500">
            e-Shopping Center
          </div>
        </Link>
      </div>

      <div className="flex relative">
        {isLoggedIn && (
          <>
            <Link className="mr-7 font-semibold hover:font-bold" to="/order-card">
              <GiShoppingCart size={53} style={{marginRight:'-4px'}} />
              <span className='font-bold text-gray-600 px-1 rounded-full bg-white flex items-center justify-center font-mono'>{totalCartNumber}</span>
            </Link>
            <span className='text-gray-500 absolute left-20 top-4'>|</span>
            <div className="flex flex-col justify-center cursor-pointer mt-1"  onClick={handleClick}>
              <span className='text-green-700 font-semibold hover:text-green-500'>
                <FaUser size={23} /> My Account
              </span>
              <span className='text-gray-700 font-semibold text-sm mt-1'>
                {user?.name.toUpperCase()} {user?.surname.toUpperCase()}
              </span>
            </div>
            {isAppear && (
              <div className='z-10 absolute top-20 p-1 border border-solid border-gray-300 rounded-md min-w-mw-125 right-0 bg-gray-200 shadow-lg shadow-gray-500/50'>
                <div className='userInfoWrapper'>
                  <Link to="/profile">
                    <ImProfile size={20} />
                    Profile
                  </Link>
                </div>
                <div className='userInfoWrapper'>
                  <IoLogOutOutline size={23} />
                  <Logout />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar