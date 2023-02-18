'use client';

import './styles.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useContext } from 'react';
import BookType from '@/types/types';

import PopUp from '@/app/components/PopUp/page';
import Input from '@/app/components/Input/page';
import FormContainer from '@/app/components/FormContainer/page';
import FormButton from '@/app/components/FormButton/page';
import { EditContext } from '@/app/components/EditContext/page';

type BookRegistrationType = {
  name: string;
  price: number;
  imgSrc: string;
  description: string;
};

async function registerBook(data: BookRegistrationType, jwt: string) {

  const params = {
    name: data.name,
    price: data.price,
    imgSrc: data.imgSrc,
    description: data.description,
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
  const [explanationPopUp, setExplanationPopUp] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<BookType | undefined>(undefined);
  const { data: session } = useSession();
  const { item, clearItem } = useContext(EditContext);

  useEffect(() => {
    console.log('a');
    if (item) {
      setBookToEdit(item);
      clearItem();
    }
  }, [item, clearItem]);

  const schema = yup.object().shape({
    name: yup.string().max(100, 'Name is too long').required('Name is required'),
    price: yup.number().typeError('Price must be a number').required('Price is required'),
    imgSrc: yup.string().max(300, 'Image source is too long').required('Image source is required'),
    description: yup.string().max(1000, 'Description is too long').required('Description is required'),
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

  const handleClick = () => {
    setExplanationPopUp(true);
  };

  return (
    <FormContainer title={!bookToEdit ? 'Add your book' : 'Edit your book'}>
      <form onSubmit={onSubmit}>
        <Input type="text" title="Name" error={errors.name?.message?.toString()} register={register('name')} value={bookToEdit?.name ? bookToEdit?.name : ''}></Input>
        <Input type="text" title="Price" error={errors.price?.message?.toString()} register={register('price')} value={bookToEdit?.price ? bookToEdit?.price : ''}></Input>
        <Input type="text" title="Image source" error={errors.imgSrc?.message?.toString()} register={register('imgSrc')} value={bookToEdit?.img_src ? bookToEdit?.img_src : ''}></Input>
        <Input type="text" title="Description" error={errors.description?.message?.toString()} register={register('description')} value={bookToEdit?.description ? bookToEdit?.description : ''}></Input>
        <p className="image-source-explanation" onClick={handleClick}>?</p>
        <FormButton title={!bookToEdit ? 'Add' : 'Edit'}></FormButton>
      </form>
      <PopUp title={'Something went wrong'} content={'An error ocurred while adding your book, please try again soon...'} trigger={errorPopUp} setTrigger={setErrorPopUp}></PopUp>
      <PopUp title={'Success!'} content={'Your book has been added to the store. You may refresh the page to see it.'} trigger={successPopUp} setTrigger={setSuccessPopUp}></PopUp>
      <PopUp title={'How to get image source?'} content={"Look for your book cover image on google. On a computer, right-click on the image to bring up a context menu. On a mobile device, tap and hold on the image until a context menu appears. In the context menu, you should see an option labeled \"Copy image address\" or \"Copy image URL.\" Click on this option to copy the URL to your clipboard. Once you have the URL copied to your clipboard, you can paste it into the image source input."} trigger={explanationPopUp} setTrigger={setExplanationPopUp}></PopUp>
    </FormContainer>
  );
}

export default Register;
