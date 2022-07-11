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