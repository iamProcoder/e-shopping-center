import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { Register } from '../services/user.service';
import { IRegister } from '../models/AuthModel';
import { IToken } from '../models/TokenModel';
import validationSchema from '../validations/register.validation';

import { useAppDispatch } from '../redux/hooks';
import { loginUser } from '../redux/user/authSlice'

const SingUp: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {register, loading, error} = Register();

  const initialValues: IRegister = {
    email: "",
    password: "",
    comparePassword: "",
    name: "",
    surname: "",
    birthday: ""
  };

  const formik = useFormik<IRegister>({
    initialValues,
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const dataInput = {...values};
        delete dataInput['comparePassword'];

        if (loading) return <p>"Loading..."</p>;
        if (error) return <p>Error! {error.message}</p>;

        const { data } = await register({ variables: { data: dataInput} });
        const { accessToken, refreshToken }: IToken = data?.Register;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        dispatch(loginUser());        
        navigate('/');

      } catch (e: any) {
        bag.setErrors(e);
        console.log('Register submit :>> ', e.message);
      }
    }
  });

  return (
    <div className="flex items-center justify-center">
      <div className='px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3'>
      <h3 className="text-2xl font-bold text-center mb-3">Join us</h3>
        <div className='min-h-min bg-gray-100 p-10'>
          <form onSubmit={formik.handleSubmit}>
            <input
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="register-input"
              type={"email"}
              placeholder="email"
            />
            {formik.errors.email && formik.touched.email && (<span className="register-error">{formik.errors.email}</span>)}

            <input
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="register-input"
              type={"text"}
              placeholder="name"
            />
            {formik.errors.name && formik.touched.name && (<span className="register-error">{formik.errors.name}</span>)}

            <input
              id="surname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.surname}
              className="register-input"
              type={"text"}
              placeholder="surname"
            />
            {formik.errors.surname && formik.touched.surname && (<span className="register-error">{formik.errors.surname}</span>)}

            <input
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="register-input"
              type={"password"}
              placeholder="password"
            />
            {formik.errors.password && formik.touched.password && (<span className="register-error">{formik.errors.password}</span>)}

            <input
              id="comparePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comparePassword}
              className="register-input"
              type={"password"}
              placeholder="confirm password"
            />
            {formik.errors.comparePassword && formik.touched.comparePassword && (<span className="register-error">{formik.errors.comparePassword}</span>)}

            <input
              id="birthday"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthday}
              className="register-input"
              type={"date"}
              placeholder="birthday"
            />
            {formik.errors.birthday && formik.touched.birthday && (<span className="register-error">{formik.errors.birthday}</span>)}

            <button
              type="submit"
              className="mt-10 inline-flex justify-center w-full bg-green-800 hover:bg-green-400 text-white font-bold hover:text-black py-2 px-4 border border-gray-300 shadow-sm rounded"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SingUp