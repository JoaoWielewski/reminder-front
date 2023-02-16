'use client';

import './styles.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import PopUp from '../components/PopUp/page';
import FormContainer from '../components/FormContainer/page';
import Input from '../components/Input/page';

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

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  return response.status;
}

const fetchUser = async (email: string) => {

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


function Signup() {
  const [errorPopUp, setErrorPopUp] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const schema = yup.object().shape({
    email: yup.string().email('Email must be a valid email').max(100, 'Your email is too long').required('Email is required'),
    password: yup.string().min(6, 'Your password must have at least 6 characters').max(20, "Your password can't have more than 20 characters").required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required('Confirm password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<UserRegistrationType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (await fetchUser(data.email)) {
      const emailErrorP = document.querySelector('.email-error') as HTMLElement;
      emailErrorP.innerHTML = 'This email has already been used';
    } else {
      const inputs = document.querySelectorAll('.input-title') as unknown as HTMLInputElement[];

      const filteredInputs = Array.from(inputs).filter((element): element is HTMLInputElement => {
        return element instanceof HTMLInputElement;
      });

      filteredInputs.forEach(input => {
        input.value = '';
      });

      if (await registerUser(data) === 201) {
        router.push('/login');
      } else {
        setErrorPopUp(true);
      }
    }
  });

  function resetEmailError() {
    const emailErrorP = document.querySelector('.email-error') as HTMLElement;
    emailErrorP.innerHTML = '';
  }

  return (
    <FormContainer title="Register your account">
      <form onSubmit={onSubmit}>
        <Input type="text" title="Email" error={errors.email?.message?.toString()} register={register('email')} onChangeFunction={resetEmailError} optionalErrorReference="email"></Input>
        <Input type="password" title="Password" error={errors.password?.message?.toString()} register={register('password')}></Input>
        <Input type="password" title="Confirm password" error={errors.confirmPassword?.message?.toString()} register={register('confirmPassword')}></Input>
        <button type="submit" className="login-btn">Sign Up</button>
      </form>
      <PopUp title={'Something went wrong'} content={'An error ocurred while registering your account, please try again soon...'} trigger={errorPopUp} setTrigger={setErrorPopUp}></PopUp>
    </FormContainer>
  );
}

export default Signup;
