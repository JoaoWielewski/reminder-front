/* eslint-disable react/no-unescaped-entities */
'use client';

import './styles.css';
import Link from 'next/link';
import LoginContainer from '../components/LoginContainer/page';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type UserLoginType = {
  email: string,
  password: string,
}

const fetchUserByEmail = async (email: string) => {

  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/users/${email}`);

  try {
    const user = await res.json();
    return user;
  } catch {
    return undefined;
  }

};

const fetchUser = async (data: UserLoginType) => {

  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/users/${data.email}/${data.password}`);

  try {
    const user = await res.json();
    return user;
  } catch {
    return undefined;
  }

};

function Login() {
  const router = useRouter();

  const schema = yup.object().shape({
    email: yup.string().email('Email must be a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors }} = useForm<UserLoginType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (await fetchUserByEmail(data.email)) {

      if (await fetchUser(data)) {
        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        const redirect = router.query?.callbackUrl || '/';
        router.push(redirect as string);
      } else {
        const passwordErrorP = document.querySelector('.password-error') as HTMLElement;
        passwordErrorP.innerHTML = "Password is wrong";
      }

    } else {
      const emailErrorP = document.querySelector('.email-error') as HTMLElement;
      emailErrorP.innerHTML = "This email doesn't have an account";
    }
  });

  function resetEmailError() {
    const emailErrorP = document.querySelector('.email-error') as HTMLElement;
    emailErrorP.innerHTML = '';
  }

  function resetPasswordError() {
    const passwordErrorP = document.querySelector('.password-error') as HTMLElement;
    passwordErrorP.innerHTML = '';
  }

  return (
    <LoginContainer>
      <form onSubmit={onSubmit}>
        <h1 className="login-h1">Log into your account</h1>
        <div className="login-input-div">
          <input type="text" className="login-input login-email" placeholder=" " {...register('email')} onChange={() => resetEmailError()}/>
          <p className="login-p login-p-email">Email</p>
          <p className="error-p">{errors.email?.message?.toString()}</p>
          <p className="error-p email-error"></p>
        </div>
        <div className="login-input-div">
          <input type="password" className="login-input login-password" placeholder=" "  {...register('password')} onChange={() => resetPasswordError()}/>
          <p className="login-p login-p-password">Password</p>
          <p className="error-p">{errors.password?.message?.toString()}</p>
          <p className="error-p password-error"></p>
        </div>
        <button type="submit" className="login-btn">Log In</button>
        <p className="create-account">
          Don't have an account? <Link href="/signup">Create an account</Link>
        </p>
      </form>
    </LoginContainer>
  );
}

export default Login;
