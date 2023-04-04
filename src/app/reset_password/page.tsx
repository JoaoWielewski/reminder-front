'use client';

import './styles.css';
import Input from '@/components/Input/Input';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import FormButton from '@/components/FormButton/FormButton';
import FormLoading from '@/components/FormLoading/FormLoading';
import FormContainer from '@/components/FormContainer/FormContainer';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import PopUp from '@/components/PopUp/PopUp';

type ForgotPasswordType = {
  newPassword: string,
  confirmNewPassword: string,
}

const fetchVerifyResetKey = async (key: string) => {
  try {
    console.log(key);
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/verify_reset_key/${key}`, {
      method: 'POST',
    });

    if (res.status === 200) {
      const email = await res.json();
      return email;
    } else {
      return false;
    }

  } catch (error) {
    console.log(error);
    return false;
  }
};


function ResetPassword() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [failedVerification, setFailedVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successReset, setSuccessReset] = useState(false);

  const schema = yup.object().shape({
    newPassword: yup.string().min(6, 'Your password must have at least 6 characters').max(20, "Your password can't have more than 20 characters").required('Password is required'),
    confirmNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], "Passwords don't match").required('Confirm password is required'),
  });

  const { register, handleSubmit, formState: { errors }} = useForm<ForgotPasswordType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const inputs = document.querySelectorAll('.input-title') as unknown as HTMLInputElement[];

      const filteredInputs = Array.from(inputs).filter((element): element is HTMLInputElement => {
        return element instanceof HTMLInputElement;
      });

      filteredInputs.forEach(input => {
        input.value = '';
      });

    setLoading(false);
  });

  useEffect(() => {
    if (window) {
      const searchParam = new URLSearchParams(window.location.search);
      const key = searchParam.get('key');

      if (key) {
        (async function() {
          const result = await fetchVerifyResetKey(key);
          if (result) {
            setAccessGranted(true);
          } else {
            setFailedVerification(true);
          }
        })();
      } else {
        setFailedVerification(true);
      }
    }
  }, []);


  return (
    <div>
      {accessGranted ? (
      <FormContainer title="Reset your password">
        <form onSubmit={onSubmit}>
          <Input type="password" title="New password" error={errors.newPassword?.message?.toString()} disabled={loading} register={register('newPassword')}></Input>
          <Input type="password" title="Confirm new password" error={errors.confirmNewPassword?.message?.toString()} disabled={loading} register={register('confirmNewPassword')}></Input>
          {!loading ?
           <FormButton title="Reset" disabled={loading}></FormButton> :
           <FormLoading></FormLoading>
          }
        </form>
        <PopUp title={'Success!'} content={'Your password has been reset. You can now login.'} trigger={successReset} setTrigger={setSuccessReset}></PopUp>
        </FormContainer>)
         : <PopUp title={'Oops!'} content={'You don\'t have access to this page. If you are trying to reset your password generate a new link.'} trigger={failedVerification} setTrigger={setFailedVerification}></PopUp>}
    </div>
  );
}

export default ResetPassword;