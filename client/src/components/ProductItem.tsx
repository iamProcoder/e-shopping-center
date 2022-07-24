import { FC } from 'react';
import { Link } from 'react-router-dom'
import { IProduct } from '../models/ProductModel';

const ProductItem: FC<IProduct> = (product: IProduct) => {

  const addToCard = (product: IProduct) => {
    console.log('added product >>> ', product);
  };

  return (

    <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-2">
      <Link to={`/product-detail/${product.id}`}>
        <img datatype='text/html'
          className="p-8 rounded-t-lg"
          src={product.photos[0]}
          alt={product.title}
          
        />
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h5>
        </div>
      </Link>

      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          <>
            $ {product.price}
          </>
        </span>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => addToCard(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem

