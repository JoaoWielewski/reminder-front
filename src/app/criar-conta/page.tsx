'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './styles.css';

import CreateContainer from '@/components/CreateContainer/CreateContainer';
import FormButtonCreate from '@/components/FormButtonCreate/FormButtonCreate';
import FormContainer from '@/components/FormContainer/FormContainer';
import FormLoading from '@/components/FormLoading/FormLoading';
import Input from '@/components/Input/Input';
import InputSelectPronoun from '@/components/InputSelectPronoun/InputSelect';
import PopUp from '@/components/PopUp/PopUp';
import SideBarSmall from '@/components/SideBarSmall/SideBarSmall';
import SideBarSmallLogin from '@/components/SideBarSmallLogin/SideBarSmall';

type UserRegistrationType = {
  name: string;
  phone: string;
  specialty: string;
  email: string;
  pronoun: string;
  schedulePhone: string;
  password: string;
  confirmPassword: string;
}


async function createUser(data: UserRegistrationType) {
  const params = {
    email: data.email,
    password: data.password,
    name: data.name,
    specialty: data.specialty,
    phone: data.phone.toString(),
    pronoun: data.pronoun,
    schedulePhone: data.schedulePhone.toString(),
  };

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/doctor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  return response.status;
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


function Signup() {
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const cleanPhoneNumber = (value: string) => value.replace(/[^\d]/g, '');

  const schema = yup.object().shape({
    name: yup.string().required('Insira seu nome, por favor'),
    phone: yup.string()
    .transform(value => cleanPhoneNumber(value))
    .matches(/^\d+$/, 'Insira seu número de celular em números')
    .required('Insira seu número de celular em números'),
    specialty: yup.string().required('Insira sua especialidade, por favor'),
    schedulePhone: yup.string()
    .transform(value => cleanPhoneNumber(value))
    .matches(/^\d+$/, 'Insira seu número de celular em números')
    .required('Insira seu número de celular em números'),
    email: yup.string().email('Insira um email válido, por favor').max(100, 'O seu email está muito longo').required('Insira um email, por favor'),
    password: yup.string().required('Insira uma senha, por favor'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "As senhas não estão iguais").required('Insira a senha novamente, por favor'),
    pronoun: yup.string().required('Insira o seu sexo, por favor'),
    // daysToSchedule: yup.number()
    // .typeError('Insira a quantidade de dias em números')
    // .test('is-number', 'Insira a quantidade de dias em números', (value) => {
    //   return value !== undefined && !isNaN(value);
    // })
    // .integer('Insira a quantidade de dias em números')
    // .required('Insira a quantidade de dias em números'),
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UserRegistrationType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    if (await fetchUserByEmail(data.email)) {
      const emailErrorP = document.querySelector('.email-error') as HTMLElement;
      emailErrorP.innerHTML = 'Este email já foi usado em uma conta existente';
    } else {

      const radioInputs =document.querySelectorAll('.radio-input') as unknown as HTMLInputElement[];

    if (radioInputs[0].checked) {
      setValue('pronoun', 'M');
    } else if (radioInputs[1].checked) {
      setValue('pronoun', 'F');
    }

      const inputs = document.querySelectorAll('.input-title') as unknown as HTMLInputElement[];

      const filteredInputs = Array.from(inputs).filter((element): element is HTMLInputElement => {
        return element instanceof HTMLInputElement;
      });

      filteredInputs.forEach(input => {
        input.value = '';
      });

      if (await createUser(data) === 201) {
        setSuccessPopUp(true);
        setCreated(true);
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

  function setPronoun() {
    const radioInputs =document.querySelectorAll('.radio-input') as unknown as HTMLInputElement[];

    if (radioInputs[0].checked) {
      setValue('pronoun', 'M');
    } else if (radioInputs[1].checked) {
      setValue('pronoun', 'F');
    }

    const errorP = document.querySelector('.error-p-select-pronoun') as HTMLElement;
    errorP.innerHTML = '';
  }

  useEffect(() => {
    if (created && !successPopUp) {
      router.push('/login');
    }
  }, [successPopUp]);

  return (
    <>
    <SideBarSmallLogin></SideBarSmallLogin>
    {!session ?
    <CreateContainer title="Criar conta">
      <form onSubmit={onSubmit}>
        <Input type="text" title="Seu nome" description="(Da forma que os pacientes verão)" error={errors.name?.message?.toString()} disabled={loading} register={register('name')}></Input>
        <Input type="text" title="Email" error={errors.email?.message?.toString()} disabled={loading} register={register('email')} onChangeFunction={resetEmailError} optionalErrorReference="email"></Input>
        <Input type="text" title="Celular" description='Seu número com DDD' disabled={loading} mask='(99) 99999-9999' error={errors.phone?.message?.toString()} register={register('phone')}></Input>
        <Input type="text" title="Sua profissão/especialidade" description='Exemplos: Oftalmologista, Dentista' error={errors.specialty?.message?.toString()} disabled={loading} register={register('specialty')}></Input>
        <div className='create-div-input'>
          <Input type="text" title="Celular para realizar o agendamento" description='Número para agendamento com DDD' error={errors.schedulePhone?.message?.toString()} disabled={loading} register={register('schedulePhone')} mask='(99) 99999-9999'></Input>
          <Input type="password" title="Senha" error={errors.password?.message?.toString()} disabled={loading} register={register('password')}></Input>
          <Input type="password" title="Confirmar senha" error={errors.confirmPassword?.message?.toString()} disabled={loading} register={register('confirmPassword')}></Input>
          <InputSelectPronoun title="a" error={errors.pronoun?.message?.toString()} disabled={loading} register={register('pronoun')} onChangeFunction={setPronoun}></InputSelectPronoun>
        </div>
        {!loading ?
         <FormButtonCreate title="CRIAR" disabled={loading}></FormButtonCreate> :
         <FormLoading></FormLoading>
         }
      </form>
      <PopUp title={'Sucesso!'} content={'A sua conta foi criada.'} trigger={successPopUp} setTrigger={setSuccessPopUp}></PopUp>
      <PopUp title={'Algo deu errado'} content={'Ocorreu um erro ao tentar criar sua conta, tente novamente mais tarde...'} trigger={errorPopUp} setTrigger={setErrorPopUp}></PopUp>
    </CreateContainer> : <FormContainer title="Você não pode criar uma conta enquanto estiver logado."><div></div></FormContainer>}
    </>
  );
}

export default Signup;
