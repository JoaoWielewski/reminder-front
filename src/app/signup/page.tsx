'use client';

import './styles.css';
import LoginContainer from '../components/LoginContainer/page';
import PopUp from '../components/PopUp/page';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


type UserRegistrationType = {
  email: string;
  password: string;
  confirmPassword: string;
}


async function registerUser(data: UserRegistrationType) {
  const params = {
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  };

  const backendUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const response = await fetch(backendUrl + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  return response.status;
}

const fetchUser = async (email: string) => {
  const backendUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const res = await fetch(backendUrl + `/users/${email}`);

  try {
    const user = await res.json();
    return user;
  } catch {
    return undefined;
  }

};


function Signup() {
  const [errorPopUp, setErrorPopUp] = useState(false);
  const router = useRouter();

  const schema = yup.object().shape({
    email: yup.string().email('Email must be a valid email').max(100, 'Your email is too long').required('Email is required'),
    password: yup.string().min(6, 'Your password must have at least 6 characters').max(20, "Your password can't have more than 20 characters").required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<UserRegistrationType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (await fetchUser(data.email)) {
      const emailErrorP = document.querySelector('.email-error') as HTMLElement;
      emailErrorP.innerHTML = 'This email has already been used';
    } else {
      const emailInput = document.querySelector('.login-email') as HTMLInputElement;
      emailInput.value = '';
      const passwordInput = document.querySelector('.login-password') as HTMLInputElement;
      passwordInput.value = '';
      const confirmPasswordInput = document.querySelector('.login-confirm-password') as HTMLInputElement;
      confirmPasswordInput.value = '';

      if (await registerUser(data) === 201) {
        router.push('/login');
      } else {
        setErrorPopUp(true);
      }
    }
  });

  return (
    <LoginContainer>
      <form onSubmit={onSubmit}>
        <h1 className="login-h1">Register your account</h1>
        <div className="login-input-div">
          <input type="text" className="login-input login-email" placeholder=" " {...register('email')}/>
          <p className="login-p login-p-email">Email</p>
          <p className="error-p">{errors.email?.message?.toString()}</p>
          <p className="error-p email-error"></p>
        </div>
        <div className="login-input-div">
          <input type="password" className="login-input login-password" placeholder=" " {...register('password')}/>
          <p className="login-p login-p-password">Password</p>
          <p className="error-p">{errors.password?.message?.toString()}</p>
        </div>
        <div className="login-input-div">
          <input type="password" className="login-input login-confirm-password" placeholder=" " {...register('confirmPassword')}/>
          <p className="login-p login-p-confirm-password">Confirm password</p>
          <p className="error-p">{errors.confirmPassword?.message?.toString()}</p>
        </div>
        <button type="submit" className="login-btn">Sign Up</button>
      </form>
      <PopUp title={'Something went wrong'} content={'An error ocurred while registering your account, please try again soon...'} trigger={errorPopUp} setTrigger={setErrorPopUp}></PopUp>
    </LoginContainer>
  );
}

export default Signup;
