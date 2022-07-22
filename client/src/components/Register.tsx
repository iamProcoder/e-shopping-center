import { FC } from 'react'
import { useFormik } from 'formik';

import { Register } from '../services/user.service';
import { IRegister } from '../models/AuthModel';
import { IToken } from '../models/TokenModel';
import validationSchema from '../validations/register.validation';

const Registerr: FC<{}> = () => {
  
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
        const { accessToken, refreshToken }: IToken = data;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

      } catch (e: any) {
        bag.setErrors(e);
      }
    }
  });

  return (
    <div>
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
          placeholder="again password"
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
          className="mt-10 inline-flex justify-center w-full bg-white hover:bg-blue-500 text-black font-bold hover:text-white py-2 px-4 border border-gray-300 shadow-sm rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Registerr