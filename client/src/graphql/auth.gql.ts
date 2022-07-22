import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation Register($data: RegisterUserInput!) {
        Register(data: $data) {
            accessToken
            refreshToken
        }
    }
`;

export const LOGIN = gql`
    mutation Login($data: LoginUserInput!) {
        Login(data: $data) {
            accessToken
            refreshToken 
        }
    }
`;