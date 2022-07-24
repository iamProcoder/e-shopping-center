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

export const LOGOUT = gql`
    mutation Logout($data: LogoutUserInput) {
        Logout(data: $data)
    }
`;

export const USER_INFO_BY_TOKEN = gql`
    query UserInfoByToken($refreshToken: String!) {
        userInfoByToken(refresh_token: $refreshToken) {
            id
            email
            name
            surname
            birthday
            createdAt
        }
}
`;