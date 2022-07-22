import { useQuery } from '@apollo/client'
import { GET_PRODUCTS, GET_PRODUCT } from '../graphql/product.gql'
import { IProduct } from '../models/ProductModel';

export const ProductList = () => {
    const { data, loading, error } = useQuery(GET_PRODUCTS);
    return {
        products: data?.getProductList as IProduct[],
        loading,
        error
    };
}

export const ProductGetById = (id: string) => {
    const { data, loading, error } = useQuery(GET_PRODUCT, {variables: { getProductId: id }});
    return {
        product: data?.getProduct as IProduct,
        loading,
        error
    }
}
