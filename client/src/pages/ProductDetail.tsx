import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import {ProductGetById} from '../services/product.service'
import { IProduct } from '../models/ProductModel';

const ProductDetail = () => {
  const { id } = useParams<'id'>();

  const { product, loading, error } = ProductGetById(id!);
  if (loading) return <p>"Loading..."</p>;
  if (error) return <p>Error! {error.message}</p>;

  const addToCard = (product: IProduct) => {
    console.log('added product >>> ', product);
  };

  return (
    <div className="m-8 border border-solid rounded-md border-gray-300 p-5">
      <div className="flex flex-row justify-between items-center w-auto">
        <div className="w-2/4">
          <div
            id="default-carousel"
            className="relative"
            data-carousel="static"
          >
            <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
              {product.photos?.map((photo: string, index: number) => (
                <Fragment key={index}>
                  <div className="duration-700 ease-in-out" data-carousel-item>
                    <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800"></span>
                    <img
                      src={photo}
                      className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                      alt="..."
                    />
                  </div>
                </Fragment>
              ))}
            </div>

            <button
              type="button"
              className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                <span className="hidden"></span>
              </span>
            </button>
            <button
              type="button"
              className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
                <span className="hidden"></span>
              </span>
            </button>
          </div>
        </div>

        <div className="w-2/4">
          <div className="text-2xl font-bold underline">{product.title}</div>

          <div className="text-base text-gray-800 mt-5">
            {product.description}
          </div>
          <div className="text-2xl font-bold mt-5">{product.price} $</div>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
            onClick={() => addToCard(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail