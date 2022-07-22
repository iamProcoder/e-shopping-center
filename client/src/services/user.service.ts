import { useMutation } from '@apollo/client';
import { LOGIN, REGISTER } from '../graphql/auth.gql'

export const Register = () => {
    const [register, { loading, error }] = useMutation(REGISTER);

    return {
        register,
        loading,
        error
    }
}