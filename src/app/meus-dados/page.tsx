'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './styles.css';

import FormButton from '@/components/FormButton/FormButton';
import FormContainer from '@/components/FormContainer/FormContainer';
import FormLoading from '@/components/FormLoading/FormLoading';
import Input from '@/components/Input/Input';
import PopUp from '@/components/PopUp/PopUp';
import { frontEndRedirect } from '@/utils/front-end-redirect';

type UserRegistrationType = {
  phone: string;
  email: string;
  specialty: string;
  schedulePhone: string;
  daysToSchedule: number;
}

export type UserType = {
  id: string
  name: string
  phone: string
  specialty: string
  daysToSchedule: number
  email: string
  pronoun: string
  monthlyReminders: number
  remainingReminders: number
  isActive: boolean
  schedulePhone: string
}


async function updateUser(data: UserRegistrationType, jwt: string) {
  const params = {
    phone: data.phone,
    email: data.email,
    specialty: data.specialty,
    schedulePhone: data.schedulePhone,
    daysToSchedule: data.daysToSchedule
  };

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/doctor', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  return response.status;
}

const fetchUser = async (jwt: string) => {

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/doctor`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    return undefined;
  }

};


function Dados() {
  const [errorPopUp, setErrorPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const {data: session, status} = useSession();

  const schema = yup.object().shape({
    phone: yup.string().required('Insira o seu número de celular, por favor'),
    email: yup.string().email('Este email não é válido').required('Insira o seu email, por favor'),
    specialty: yup.string().required('Insira a sua especialidade, por favor'),
    daysToSchedule: yup.string()
    .test('is-number', 'A quantidade de dias precisa ser um número', (value) => {
      if (value === undefined) {
        return false;
      }
      const integerValue = parseInt(value);
      return !isNaN(integerValue);
    })
    .required('Insira a quantidade de dias, por favor'),
    schedulePhone: yup.string().required('Insira o número de celular de agendamento, por favor'),
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UserRegistrationType>({
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
    if (session && session.jwt) {
      if (await updateUser(data, session.jwt) === 204) {
        setSuccessPopUp(true);
      } else {
        setErrorPopUp(true);
      }
    }

    setLoading(false);
  });

  useEffect(() => {
    async function fetchData() {
      if (session && session.jwt) {
        const user = await fetchUser(session.jwt);
        setUser(user);
        setValue('phone', user.phone);
        setValue('email', user.email);
        setValue('specialty', user.specialty);
        setValue('schedulePhone', user.schedulePhone);
        setValue('daysToSchedule', user.daysToSchedule);
      }

    }
    fetchData();
  }, [session, setValue]);

  if (!session && status !== 'loading') {
    return frontEndRedirect('/agendar');
  }

  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session) return null;

  return (
    <>
    {session ?
    <FormContainer title="Meus dados">
      <form onSubmit={onSubmit}>
        <Input type="phone" title="Meu número de celular" defaultValue={user?.phone} error={errors.phone?.message?.toString()} disabled={loading} register={register('phone')}></Input>
        <Input type="email" title="Meu email" defaultValue={user?.email} error={errors.email?.message?.toString()} disabled={loading} register={register('email')}></Input>
        <Input type="specialty" title="Minha especialidade" defaultValue={user?.specialty} error={errors.specialty?.message?.toString()} disabled={loading} register={register('specialty')}></Input>
        <Input type="schedulePhone" title="Número de celular para agendamento" defaultValue={user?.schedulePhone} error={errors.schedulePhone?.message?.toString()} disabled={loading} register={register('schedulePhone')}></Input>
        <Input type="daysToSchedule" title="Média de dias para consulta" defaultValue={user?.daysToSchedule} error={errors.daysToSchedule?.message?.toString()} disabled={loading} register={register('daysToSchedule')}></Input>
        {!loading ?
         <FormButton title="EDITAR" disabled={loading}></FormButton> :
         <FormLoading></FormLoading>
         }
      </form>
      <PopUp title={'Successo!'} content={'Os seus dados foram alterados'} trigger={successPopUp} setTrigger={setSuccessPopUp}></PopUp>
      <PopUp title={'Algo deu errado'} content={'Um erro ocorreu ao atualizar os seus dados, tente novamente mais tarde...'} trigger={errorPopUp} setTrigger={setErrorPopUp}></PopUp>
    </FormContainer> : <FormContainer title="Você não pode mudar seus dados antes de entrar em sua conta."><div></div></FormContainer>}
    </>
  );
}

export default Dados;
