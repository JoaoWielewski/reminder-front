/* eslint-disable react/no-unescaped-entities */
'use client';

import './styles.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import FormContainer from '../components/FormContainer/page';
import Input from '../components/Input/page';

type UserLoginType = {
  email: string,
  password: string,
}

const fetchUserByEmail = async (email: string) => {

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/users/${email}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch user by email: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    return undefined;
  }

};

const fetchUser = async (data: UserLoginType) => {

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/users/${data.email}/${data.password}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    return undefined;
  }
};

function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

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

        const searchParams = new URLSearchParams(document.location.search);
        const redirect = searchParams.get('redirect') || '/';
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
    <FormContainer title="Log into your account">
      <form onSubmit={onSubmit}>
        <Input type="text" title="Email" error={errors.email?.message?.toString()} register={register('email')} onChangeFunction={resetEmailError} optionalErrorReference="email"></Input>
        <Input type="password" title="Password" error={errors.password?.message?.toString()} register={register('password')} onChangeFunction={resetPasswordError} optionalErrorReference="password"></Input>
        <button type="submit" className="login-btn">Log In</button>
        <p className="create-account">
          Don't have an account? <Link href="/signup">Create an account</Link>
        </p>
      </form>
    </FormContainer>
  );
}

export default Login;
