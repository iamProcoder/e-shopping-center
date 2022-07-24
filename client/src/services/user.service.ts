import { useMutation, useQuery } from '@apollo/client';
import { LOGIN, REGISTER, LOGOUT, USER_INFO_BY_TOKEN } from '../graphql/auth.gql'
import { IUser } from '../models/UserModel';

export const Register = () => {
    const [register, { loading, error }] = useMutation(REGISTER);
    return {
        register,
        loading,
        error
    }
}

export const Login = () => {
    const [login, { loading, error }] = useMutation(LOGIN);
    return {
        login,
        loading,
        error
    }
}

export const Logout = () => {
    const [logout, { loading, error }] = useMutation(LOGOUT);
    return {
        logout,
        loading,
        error
    }
}

export const UserInfoByToken = (refreshToken: string) => {
    const { data, loading, error } = useQuery(USER_INFO_BY_TOKEN, {variables: { refreshToken: refreshToken }});
    return {
        user: data?.userInfoByToken as IUser,
        loading,
        error
    };
}