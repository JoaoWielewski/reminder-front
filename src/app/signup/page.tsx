'use client';

import './styles.css';
import LoginContainer from '../components/LoginContainer/page';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';


type UserRegistrationType = {
  email: string;
  password: string;
  confirmPassword: string;
}


function registerUser(data: UserRegistrationType) {
  const params = {
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  };

  const backendUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL!;

  fetch(backendUrl + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}


function Signup() {
  const router = useRouter();

  const schema = yup.object().shape({
    email: yup.string().email('Email must be a valid email').max(100, 'Your email is too long').required('Email is required'),
    password: yup.string().min(6, 'Your password must have at least 6 characters').max(20, "Your password can't have more than 20 characters").required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<UserRegistrationType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    const emailInput = document.querySelector('.login-email') as HTMLInputElement;
    emailInput.value = '';
    const passwordInput = document.querySelector('.login-password') as HTMLInputElement;
    passwordInput.value = '';
    const confirmPasswordInput = document.querySelector('.login-confirm-password') as HTMLInputElement;
    confirmPasswordInput.value = '';

    //const { email, password } = data;
    registerUser(data);

    router.push('/login');

  });

  return (
    <LoginContainer>
      <form onSubmit={onSubmit}>
        <h1 className="login-h1">Register your account</h1>
        <div className="login-input-div">
          <input type="text" className="login-input login-email" placeholder=" " {...register('email')}/>
          <p className="login-p login-p-email">Email</p>
          <p className="error-p">{errors.email?.message?.toString()}</p>
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
    </LoginContainer>
  );
}

export default Signup;
