import React, { Fragment, FC, ReactElement } from 'react';
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../graphql/product.gql'

import { Product } from '../models/ProductModel';
import ProductItem from '../components/ProductItem';


const Products: FC<{}> = (): ReactElement => {
  
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <p>"Loading..."</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {
        data && data.getProductList?.map((p: Product) => (
          <Fragment key={p.id}>
            <ProductItem {...p} />
          </Fragment>
        ))
      }
    </div>
  );
}

export default Products