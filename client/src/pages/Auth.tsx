import { useState } from 'react'
import Login from '../components/Login';
import Register from '../components/Register';

import { CgArrowsExchangeAlt } from 'react-icons/cg';

const Auth = () => {

  const [signUp, setSignUp] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="flex justify-end items-end">
        <button onClick={() => setSignUp(!signUp)} className=" bg-blue-800 hover:bg-blue-400 text-white font-bold hover:text-black py-2 px-4 border border-gray-300 shadow-sm rounded">
          <CgArrowsExchangeAlt size={25} /> {signUp ? "Login" : "Register"}
        </button>
      </div>
      {signUp ? <Register /> : <Login />}
    </div>
  );
}

export default Auth