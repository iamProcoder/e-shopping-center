import * as yup from 'yup';
import parse from "date-fns/parse";

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
        .required("required field"),
    comparePassword: yup
        .string()
        .oneOf([yup.ref("password")], "passwords does not match")
        .required("required field"),
    name: yup
        .string()
        .min(3, 'must be at least 3 characters')
        .max(200, 'must be a maximum of 200 characters')
        .required("required field"),
    surname: yup
        .string()
        .min(3, 'must be at least 3 characters')
        .max(200, 'must be a maximum of 200 characters')
        .required("required field"),
    birthday: yup
        .date()
        .transform(function (value, originalValue) {
            if (this.isType(value)) {
              return value;
            }
            const result = parse(originalValue, "dd.MM.yyyy", new Date());
            return result;
          })
        .typeError("please enter a valid date")
        .required()
        .min("1900-01-01", "must be a min date of 1900-01-01")
});

export default validations;