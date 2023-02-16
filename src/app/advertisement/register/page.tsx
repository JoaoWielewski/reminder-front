'use client';

import './styles.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import PopUp from '@/app/components/PopUp/page';
import Input from '@/app/components/Input/page';
import FormContainer from '@/app/components/FormContainer/page';

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
    const inputs = document.querySelectorAll('.input-title') as unknown as HTMLInputElement[];

    const filteredInputs = Array.from(inputs).filter((element): element is HTMLInputElement => {
      return element instanceof HTMLInputElement;
    });

    filteredInputs.forEach(input => {
      input.value = '';
    });

    if (await registerBook(data, session?.jwt!) === 201) {
      setSuccessPopUp(true);
    } else {
      setErrorPopUp(true);
    }
  });

  return (
    <FormContainer title="Add your book">
      <form onSubmit={onSubmit}>
        <Input type="text" title="Name" error={errors.name?.message?.toString()} register={register('name')}></Input>
        <Input type="text" title="Price" error={errors.price?.message?.toString()} register={register('price')}></Input>
        <Input type="text" title="Image source" error={errors.imgSrc?.message?.toString()} register={register('imgSrc')}></Input>
        <button type="submit" className="register-btn">Add</button>
      </form>
      <PopUp title={'Something went wrong'} content={'An error ocurred while registering your account, please try again soon...'} trigger={errorPopUp} setTrigger={setErrorPopUp}></PopUp>
      <PopUp title={'Success!'} content={'Your book has been added to the store'} trigger={successPopUp} setTrigger={setSuccessPopUp}></PopUp>
    </FormContainer>
  );
}

export default Register;
