'use client';

import './styles.css';
import LoginContainer from '@/app/components/LoginContainer/page';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import PopUp from '@/app/components/PopUp/page';
import { useState } from 'react';

type BookRegistrationType = {
  name: string;
  price: number;
  imgSrc: string;
};

async function registerBook(data: BookRegistrationType, jwt: string) {
  const params = {
    name: data.name,
    price: data.price,
    imgSrc: data.imgSrc
  };

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify(params),
  });

  return response.status;
}


function Register() {
  const [errorPopUp, setErrorPopUp] = useState(false);
  const [successPopUp, setSuccessPopUp] = useState(false);
  const { data: session } = useSession();

  const schema = yup.object().shape({
    name: yup.string().max(100, 'Name is too long').required('Name is required'),
    price: yup.number().typeError('Price must be a number').required('Price is required'),
    imgSrc: yup.string().max(300, 'Image source is too long').required('Image source is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<BookRegistrationType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const nameInput = document.querySelector('.register-name') as HTMLInputElement;
    nameInput.value = '';
    const priceInput = document.querySelector('.register-price') as HTMLInputElement;
    priceInput.value = '';
    const imgSrcInput = document.querySelector('.register-img-src') as HTMLInputElement;
    imgSrcInput.value = '';

    if (await registerBook(data, session?.jwt!) === 201) {
      setSuccessPopUp(true);
    } else {
      setErrorPopUp(true);
    }
  });

  return (
    <LoginContainer>
      <form onSubmit={onSubmit}>
        <h1 className="register-h1">Add your book</h1>
        <div className="register-input-div">
          <input type="text" className="register-input register-name" placeholder=" " {...register('name')}/>
          <p className="register-p register-p-name">Name</p>
          <p className="error-p">{errors.name?.message?.toString()}</p>
        </div>
        <div className="register-input-div">
          <input type="text" className="register-input register-price" placeholder=" " {...register('price')}/>
          <p className="register-p register-p-price">Price</p>
          <p className="error-p">{errors.price?.message?.toString()}</p>
        </div>
        <div className="register-input-div">
          <input type="text" className="register-input register-img-src" placeholder=" " {...register('imgSrc')}/>
          <p className="register-p register-p-img-src">Image source</p>
          <p className="error-p">{errors.imgSrc?.message?.toString()}</p>
        </div>
        <button type="submit" className="register-btn">Add</button>
      </form>
      <PopUp title={'Something went wrong'} content={'An error ocurred while registering your account, please try again soon...'} trigger={errorPopUp} setTrigger={setErrorPopUp}></PopUp>
      <PopUp title={'Success!'} content={'Your book has been added to the store'} trigger={successPopUp} setTrigger={setSuccessPopUp}></PopUp>
    </LoginContainer>
  );
}

export default Register;
