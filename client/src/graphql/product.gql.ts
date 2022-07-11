import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
    query {
        getProductList {
            id
            title
            description
            price
            photos
            createdAt
        }
    }
`;

export const GET_PRODUCT = gql`
    query GetProduct($getProductId: ID!) {
        getProduct(id: $getProductId) {
            id
            title
            description
            price
            photos
            createdAt
        }
    }
`;