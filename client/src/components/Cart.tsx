import { ICart } from "../models/CartModel";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { cartList, removeCart, increaseQuantity, decreaseQuantity, } from "../redux/order/orderSlice";

const Cart = () => {
  const dispatch = useAppDispatch();
  const _cartList = useAppSelector<ICart[]>(cartList);
  let totalCartPrice: number = 0;

  _cartList.forEach((cartItem, index) => {
    totalCartPrice +=
      _cartList[index].quantity * _cartList[index].product.price;
  });

  return (
    <div className="container p-8 mx-auto mt-5">
      <div className="w-full overflow-x-auto">
        <div className="my-2 shadow-md">
          <h3 className="text-xl font-bold tracking-wider pb-3">Shopping Cart</h3>
        </div>
        {totalCartPrice === 0 && (
          <span className="px-4 text-red-800 bg-red-300 rounded shadow-lg shadow-red-500/50">
            No product found in cart
          </span>
        )}
        <table
          className="w-full shadow-inner"
          hidden={totalCartPrice > 0 ? false : true}
        >
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 font-bold whitespace-nowrap">Photo</th>
              <th className="px-6 py-3 font-bold whitespace-nowrap">Product Name</th>
              <th className="px-6 py-3 font-bold whitespace-nowrap">Quantity</th>
              <th className="px-6 py-3 font-bold whitespace-nowrap">Unit Price</th>
              <th className="px-6 py-3 font-bold whitespace-nowrap">Price</th>
              <th className="px-6 py-3 font-bold whitespace-nowrap">Remove</th>
            </tr>
          </thead>
          <tbody>
            {_cartList.map((cart, index) => (
              <tr key={index} className="pb-2 whitespace-nowrap">
                <td>
                  <div className="flex justify-center">
                    <img
                      src={cart.product.photos[0]}
                      className="p-3 border border-solid border-gray-400 object-cover h-28 w-28 rounded-2xl"
                      alt="image"
                    />
                  </div>
                </td>
                <td className="p-4 px-6 text-center whitespace-nowrap">
                  <div className="flex flex-col items-center justify-center">
                    <h3>{cart.product.title}</h3>
                  </div>
                </td>
                <td className="p-4 px-6 text-center whitespace-nowrap">
                  <div className="flex flex-row justify-evenly">
                    <button onClick={() => dispatch(decreaseQuantity(index))}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-flex w-6 h-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <span className="text-center bg-gray-100 outline-none">
                      {cart.quantity}
                    </span>
                    <button onClick={() => dispatch(increaseQuantity(index))}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-flex w-6 h-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="p-4 px-6 text-center whitespace-nowrap">
                  ${cart.product.price}
                </td>
                <td className="p-4 px-6 text-center whitespace-nowrap">
                  ${cart.product.price * cart.quantity}
                </td>
                <td className="p-4 px-6 text-center whitespace-nowrap">
                  <button onClick={() => dispatch(removeCart(index))}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalCartPrice > 0 && (
          <>
            <div className="mt-4">
              <div className="py-4 px-16 rounded-md shadow">
                <div
                  className="
                  flex
                  items-center
                  justify-between
                  px-4
                  py-2
                  mt-3
                "
                >
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-2xl font-bold">${totalCartPrice}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                className="
                w-full
                py-2
                text-center text-white
                bg-blue-500
                rounded-md
                shadow
                hover:bg-blue-600
              "
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Cart;
