'use client';

import './styles.css';
import Input from '@/components/Input/Input';
import { useState } from 'react';
import * as yup from 'yup';

import FormButton from '@/components/FormButton/FormButton';
import FormLoading from '@/components/FormLoading/FormLoading';
import FormContainer from '@/components/FormContainer/FormContainer';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import PopUp from '@/components/PopUp/PopUp';

type ForgotPasswordType = {
  email: string,
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


function ConfirmPassword() {
  const [loading, setLoading] = useState(false);
  const [forgotPasswordPopUp, setForgotPasswordPopUp] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email('Email must be a valid email').required('Email is required')
  });

  const { register, handleSubmit, formState: { errors }} = useForm<ForgotPasswordType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    if (await fetchUserByEmail(data.email)) {

      //

    } else {
      const emailErrorP = document.querySelector('.email-error') as HTMLElement;
      emailErrorP.innerHTML = "This email doesn't have an account";
    }
    setLoading(false);
  });


  function resetEmailError() {
    const emailErrorP = document.querySelector('.email-error') as HTMLElement;
    emailErrorP.innerHTML = '';
  }

  return (
    <FormContainer title="Reset your password">
      <form onSubmit={onSubmit}>
        <p className="forgot-password-description">A link will be sent to your email in order for you to change your password.</p>
        <p className="forgot-password-description">Please, inform the email that is associated with your account:</p>
        <Input type="text" title="Email" error={errors.email?.message?.toString()} disabled={loading} register={register('email')} onChangeFunction={resetEmailError} optionalErrorReference="email"></Input>
        {!loading ?
         <FormButton title="Send" disabled={loading}></FormButton> :
         <FormLoading></FormLoading>
        }
      </form>
      <PopUp title={'Success!'} content={'The link has been sent to your email.'} trigger={forgotPasswordPopUp} setTrigger={setForgotPasswordPopUp}></PopUp>
    </FormContainer>
  );
}

export default ConfirmPassword;