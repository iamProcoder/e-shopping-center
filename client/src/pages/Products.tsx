import React, { Fragment, FC, ReactElement } from 'react';

import {ProductList} from '../services/product.service'
import { IProduct } from '../models/ProductModel';
import ProductItem from '../components/ProductItem';

const Products: FC<{}> = (): ReactElement => { 
  const { products, loading, error } = ProductList();
  if (loading) return <p>"Loading..."</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {
        products && products?.map((p: IProduct) => (
          <Fragment key={p.id}>
            <ProductItem {...p} />
          </Fragment>
        ))
      }
    </div>
  );
}

export default Products