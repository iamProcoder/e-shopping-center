import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex justify-between border-b border-solid border-gray-400 items-center p-3">
      <div>
        <Link to='/' className="flex">
          <div className="font-bold flex items-center hover:text-gray-500">e-Shopping Center</div>
        </Link>
      </div>

      <div className="flex">
          <Link to='/profile'>Profile</Link>
          <Link className=' ml-5' to='/order-card'>Order</Link>
      </div>
    </nav>
  );
}

export default Navbar