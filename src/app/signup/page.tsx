'use client';

import './styles.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import PopUp from '@/components/PopUp/PopUp';
import FormContainer from '@/components/FormContainer/FormContainer';
import Input from '@/components/Input/Input';
import FormButton from '@/components/FormButton/FormButton';
import FormLoading from '@/components/FormLoading/FormLoading';

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
  const [verifyAccountPopUp, setVerifyAccountPopUp] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
        setVerifyAccountPopUp(true);
      } else {
        setErrorPopUp(true);
      }
    }
    setLoading(false);
  });

  function resetEmailError() {
    const emailErrorP = document.querySelector('.email-error') as HTMLElement;
    emailErrorP.innerHTML = '';
  }


  return (
    <>
    {!session ?
    <FormContainer title="Register your account">
      <form onSubmit={onSubmit}>
        <Input type="text" title="Email" error={errors.email?.message?.toString()} disabled={loading} register={register('email')} onChangeFunction={resetEmailError} optionalErrorReference="email"></Input>
        <Input type="password" title="Password" error={errors.password?.message?.toString()} disabled={loading} register={register('password')}></Input>
        <Input type="password" title="Confirm password" error={errors.confirmPassword?.message?.toString()} disabled={loading} register={register('confirmPassword')}></Input>
        {!loading ?
         <FormButton title="Sign Up" disabled={loading}></FormButton> :
         <FormLoading></FormLoading>
         }
      </form>
      <PopUp title={'A link has been sent to your email.'} content={'Now you need to verify your email in order to complete your account registration. It might take a while for you to recieve the email, also check your spam box.'} trigger={verifyAccountPopUp} setTrigger={setVerifyAccountPopUp}></PopUp>
      <PopUp title={'Something went wrong'} content={'An error ocurred while registering your account, please try again soon...'} trigger={errorPopUp} setTrigger={setErrorPopUp}></PopUp>
    </FormContainer> : <FormContainer title="You can't register an account while logged in"><div></div></FormContainer>}
    </>
  );
}

export default Signup;

// <button type="submit" className="login-btn">Sign Up</button>