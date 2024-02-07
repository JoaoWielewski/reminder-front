/* eslint-disable react/no-unescaped-entities */
'use client';

import './styles.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import FormContainer from '@/components/FormContainer/FormContainer';
import Input from '@/components/Input/Input';
import FormButton from '@/components/FormButton/FormButton';
import { useState } from 'react';
import FormLoading from '@/components/FormLoading/FormLoading';
import SideBarSmall from '@/components/SideBarSmall/SideBarSmall';
import LoginContainer from '@/components/LoginContainer/LoginContainer';

type UserLoginType = {
  email: string,
  password: string,
}

const fetchUserByEmail = async (email: string) => {

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/doctor-email/${email}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch user by email: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    return undefined;
  }

};

const fetchUser = async (data: UserLoginType) => {
  const params = {
    email: data.email,
    password: data.password,
  };

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    return undefined;
  }
};

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status} = useSession();

  const schema = yup.object().shape({
    email: yup.string().email('Este email não é válido').required('Insira o email, por favor'),
    password: yup.string().required('Insira a senha, por favor'),
  });

  const { register, handleSubmit, formState: { errors }} = useForm<UserLoginType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    setLoading(true);
    if (await fetchUserByEmail(data.email)) {

      if (await fetchUser(data)) {
        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        const searchParams = new URLSearchParams(document.location.search);
        const redirect = searchParams.get('redirect') || '/painel';
        router.push(redirect as string);
      } else {
        const passwordErrorP = document.querySelector('.password-error') as HTMLElement;
        passwordErrorP.innerHTML = "A senha está incorreta";
      }

    } else {
      const emailErrorP = document.querySelector('.email-error') as HTMLElement;
      emailErrorP.innerHTML = "Este email não possui uma conta";
    }
    setLoading(false);
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
    <>
    <SideBarSmall></SideBarSmall>
    {!session ?
    <LoginContainer title="Entrar na conta">
      <form onSubmit={onSubmit}>
        <Input type="text" title="Email" error={errors.email?.message?.toString()} disabled={loading} register={register('email')} onChangeFunction={resetEmailError} optionalErrorReference="email"></Input>
        <Input type="password" title="Senha" error={errors.password?.message?.toString()} disabled={loading} register={register('password')} onChangeFunction={resetPasswordError} optionalErrorReference="password"></Input>
        {!loading ?
         <FormButton title="ENTRAR" disabled={loading}></FormButton> :
         <FormLoading></FormLoading>
        }
        <p className="create-account">
          Não tem uma conta? <Link href="/criar-conta" className="create-account-link">Criar uma conta</Link>
        </p>
      </form>
    </LoginContainer> : <div></div>}
    </>
  );
}

export default Login;
