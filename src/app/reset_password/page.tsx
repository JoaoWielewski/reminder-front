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
import { useRouter } from 'next/navigation';

type ForgotPasswordType = {
  newPassword: string,
  confirmNewPassword: string,
}

const fetchVerifyResetKey = async (key: string) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/verify_reset_key/${key}`, {
      method: 'POST',
    });

    if (res.status === 200) {
      const responseObject = await res.json();
      return responseObject.email;
    } else {
      return false;
    }

  } catch (error) {
    console.log(error);
    return false;
  }
};

async function resetPassword(email: string, newPassword: string) {

  const params = {
    email,
    newPassword,
  };

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/resetpassword`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });

  return response.status;
}

function ResetPassword() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [failedVerification, setFailedVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successReset, setSuccessReset] = useState(false);
  const [failedReset, setFailedReset] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [failedVerificationClosed, setFailedVerificationClosed] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

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

      if (await resetPassword(email, data.newPassword) === 204) {
        setSuccessReset(true);
        setExecuted(true);
      } else {
        setFailedReset(true);
      }

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
            setEmail(result);
          } else {
            setFailedVerification(true);
            setFailedVerificationClosed(true);
          }
        })();
      } else {
        setFailedVerification(true);
      }
    }
  }, []);

  useEffect(() => {
    if (executed && !successReset) {
      router.push('/login');
    } else if (failedVerificationClosed && !failedVerification) {
      router.push('forgot_password');
    }
  }, [executed, failedVerification, failedVerificationClosed, router, successReset]);

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
        <PopUp title={'Success!'} content={'Your password has been reset. You can now login with your new password.'} trigger={successReset} setTrigger={setSuccessReset}></PopUp>
        <PopUp title={'Oops!'} content={'Something went wrong while reseting your password, please try again soon...'} trigger={failedReset} setTrigger={setFailedReset}></PopUp>
        </FormContainer>)
         : <PopUp title={'Oops!'} content={'You don\'t have access to this page. If you are trying to reset your password generate a new link.'} trigger={failedVerification} setTrigger={setFailedVerification}></PopUp>}
    </div>
  );
}

export default ResetPassword;