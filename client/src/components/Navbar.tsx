import { useState } from 'react'
import { Link } from 'react-router-dom';

import { IUser } from '../models/UserModel';
import { useAppSelector } from '../redux/hooks';
import { loggedIn, enteranceUser } from '../redux/user/authSlice';
import Logout from './Logout';

import { FaUser } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IoLogOutOutline } from 'react-icons/io5';
import { GiShoppingCart } from 'react-icons/gi';

const Navbar = () => {
  const [isAppear, setIsAppear]= useState<boolean>(false);
  const isLoggedIn = useAppSelector<boolean>(loggedIn);
  const userName = useAppSelector<IUser>(enteranceUser)?.name;

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

      <div className="flex">
        {isLoggedIn && (
          <>
            <Link className="mr-5 font-semibold hover:font-bold" to="/order-card">
              <GiShoppingCart size={25} />
              Order
            </Link>
            <span className=" text-green-700 font-semibold cursor-pointer hover:text-green-500"  onClick={handleClick}>
              <FaUser size={23} />
              {userName?.toUpperCase()}
            </span>
            {isAppear && (
              <div className='z-10 absolute mt-10 p-1 border border-solid border-gray-300 rounded-md min-w-mw-125 right-5 bg-gray-200 shadow-lg shadow-gray-500/50'>
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