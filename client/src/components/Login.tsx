import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { Login } from '../services/user.service';
import { ILogin } from '../models/AuthModel';
import { IToken } from '../models/TokenModel';
import validationSchema from '../validations/login.validation';

import { useAppDispatch } from '../redux/hooks';
import { loginUser } from '../redux/user/authSlice'

const SingUp: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [alertError, setAllertError] = useState<string>('');

  const {login, loading} = Login();

  const initialValues: ILogin = {
    email: "",
    password: ""
  };

  const formik = useFormik<ILogin>({
    initialValues,
    validationSchema,
    onSubmit: async (values, bag) => {
      debugger;
      try {
        const dataInput = {...values};

        if (loading) return <p>"Loading..."</p>;
        
        const { data } = await login({ variables: { data: dataInput} });
        const { accessToken, refreshToken }: IToken = data?.Login;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(loginUser());
        navigate('/');

      } catch (e: any) {
        bag.setErrors(e);
        console.log('Login submit :>> ', e.message);
        setAllertError(e.message);
      }
    }
  });

  return (
    <div className="flex items-center justify-center">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-2/3 lg:w-2/3 sm:w-2/3">
        {alertError && (
          <div className="mb-5 space-y-2">
            <div
              className="px-4 py-4 text-red-800 bg-red-300 rounded shadow-lg shadow-red-500/50"
              role="alert"
            >
              {alertError}
            </div>
          </div>
        )}
        <h3 className="text-2xl font-bold text-center mb-3">Sign In</h3>
        <div className="min-h-min bg-gray-100 p-10">
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
            {formik.errors.email && formik.touched.email && (
              <span className="register-error">{formik.errors.email}</span>
            )}

            <input
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="register-input"
              type={"password"}
              placeholder="password"
            />
            {formik.errors.password && formik.touched.password && (
              <span className="register-error">{formik.errors.password}</span>
            )}

            <button
              type="submit"
              className="mt-10 inline-flex justify-center w-full bg-green-800 hover:bg-green-400 text-white font-bold hover:text-black py-2 px-4 border border-gray-300 shadow-sm rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SingUp