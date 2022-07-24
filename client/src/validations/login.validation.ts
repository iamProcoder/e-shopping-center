import * as yup from 'yup';

const validations = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email format')
        .min(3, 'must be at least 3 characters')
        .max(200, 'must be a maximum of 200 characters')
        .required("required field"),
    password: yup
        .string()
        .min(3, 'must be at least 3 characters')
        .max(200, 'must be a maximum of 200 characters')
        .required("required field")
});

export default validations;