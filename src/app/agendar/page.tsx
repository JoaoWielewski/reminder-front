'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './styles.css';

import FormButton from '@/components/FormButton/FormButton';
import FormContainer from '@/components/FormContainer/FormContainer';
import FormLoading from '@/components/FormLoading/FormLoading';
import Input from '@/components/Input/Input';
import InputSelect from '@/components/InputSelect/InputSelect';
import LogIn from '@/components/LogIn/LogIn';
import PopUp from '@/components/PopUp/PopUp';
import SideBar from '@/components/SideBar/SideBar';
import { frontEndRedirect } from '@/utils/front-end-redirect';
import { useRouter } from 'next/navigation';

type ReminderCreationType = {
  name: string;
  quantity: string;
  phone: string;
};

async function createReminder(data: ReminderCreationType, unit: string, jwt: string) {

  const params = {
    pacientName: data.name,
    periodQuantity: parseInt(data.quantity),
    periodType: unit,
    pacientPhone: data.phone.toString(),
  };

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/reminder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify(params),
  });

  return response;
}

function Register() {
  const [errorPopUp, setErrorPopUp] = useState(false);
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectDisabled, setSelectDisabled] = useState(true);
  const [unitTitle, setUnitTitle] = useState('');
  const [unitDescription, setUnitDescription] = useState('');
  const [outOfRemindersPopUp, setOutOfRemindersPopUp] = useState(false);
  const [noneRemindersPopUp, setNoneRemindersPopUp] = useState(false);
  const [noneWarning, setNoneWarning] = useState(false);
  const router = useRouter();
  const {data: session, status} = useSession();

  useEffect(() => {
    if (!successPopUp && executed && !noneWarning) {
      router.push('/painel');
    }
  }, [executed, router, successPopUp]);

  useEffect(() => {
    if (!noneRemindersPopUp && noneWarning) {
      router.push('/planos');
    }
  }, [noneRemindersPopUp]);

  const schema = yup.object().shape({
    name: yup.string().max(100, 'Nome muito longo').required('Insira o nome, por favor.'),
    phone: yup.number()
    .typeError('Insira o celular somente em números')
    .test('is-number', 'Insira o celular somente em números', (value) => {
      return value !== undefined && !isNaN(value);
    })
    .integer('Insira o celular somente em números')
    .required('Insira o celular somente em números'),
    quantity: yup.string()
    .test('is-number', 'Insira a quantidade', (value) => {
      if (value === undefined) {
        return false;
      }
      const floatValue = parseFloat(value);
      return !isNaN(floatValue);
    })
    .required('Insira a quantidade da unidade, por favor.'),
  });

  const { register, handleSubmit, formState: { errors }, setValue} = useForm<ReminderCreationType>({
    resolver: yupResolver(schema),
  });

  if (!session && status !== 'loading') {
    return frontEndRedirect('/agendar');
  }

  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session) return null;

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const radioInputs =document.querySelectorAll('.radio-input') as unknown as HTMLInputElement[];

    let unit: string = '';
    if (radioInputs[0].checked) {
      unit = 'day';
    } else if (radioInputs[1].checked) {
      unit = 'month';
    } else if (radioInputs[2].checked) {
      unit = 'year';
    }

    radioInputs[0].checked = false;
    radioInputs[1].checked = false;
    radioInputs[2].checked = false;

    const inputs = document.querySelectorAll('.input-title') as unknown as HTMLInputElement[];

    const filteredInputs = Array.from(inputs).filter((element): element is HTMLInputElement => {
      return element instanceof HTMLInputElement;
    });

    filteredInputs.forEach(input => {
      input.value = '';
    });

    const createReminderResponse = await createReminder(data, unit, session?.jwt!);
    if (createReminderResponse.status === 201) {
      setSuccessPopUp(true);
      setExecuted(true);
    } else {
      const responseJson = await createReminderResponse.json();
      if (responseJson.code === 'PLUGIN_SERVICE_OUT_OF_REMINDERS') {
        setOutOfRemindersPopUp(true);
      } else if (responseJson.code === 'PLUGIN_SERVICE_NONE_REMINDERS') {
        setNoneRemindersPopUp(true);
        setNoneWarning(true);
      } else {
        setErrorPopUp(true);
      }
    }

    setValue('name', '');
    setValue('quantity', '');
    setValue('phone', '');
    setLoading(false);
  });

  function getUnit(unit: string) {
    if (unit === 'day') {
      setUnitTitle('Em quantos dias o paciente deve voltar?');
      setUnitDescription('Exemplo: 5');
    } else if (unit === 'month') {
      setUnitTitle('Em quantos meses o paciente deve voltar?');
    } else if (unit === 'year') {
      setUnitTitle('Em quantos anos o paciente deve voltar?');
    }
    setSelectDisabled(false);
  }

  return (
    <>
    <SideBar active='schedule'></SideBar>
    <LogIn></LogIn>
    {session ?
    <FormContainer title={'Agendar lembrete'}>
      <form onSubmit={onSubmit}>
        <Input type="text" title="Nome do paciente" error={errors.name?.message?.toString()} disabled={loading} register={register('name')} ></Input>
        <Input type="text" title="Celular do paciente" error={errors.phone?.message?.toString()} disabled={loading} register={register('phone')} ></Input>
        <InputSelect title="a" disabled={loading} onChangeFunction={getUnit} error={undefined} register={undefined}></InputSelect>
        <Input type="text" title={unitTitle} description={unitDescription} error={errors.quantity?.message?.toString()} disabled={loading || selectDisabled} register={register('quantity')}></Input>
        {!loading ?
         <FormButton title={'AGENDAR'} disabled={loading}></FormButton> :
         <FormLoading></FormLoading>
        }

      </form>
      <PopUp title={'Algo deu errado'} content={'Ocorreu um erro com a criação do lembrete, tente novamente mais tarde...'} trigger={errorPopUp} setTrigger={setErrorPopUp}></PopUp>
      <PopUp title={'Successo!'} content={'O lembrete foi agendado.'} trigger={successPopUp} setTrigger={setSuccessPopUp}></PopUp>
      <PopUp title={'Algo deu errado'} content={'O seu limite mensal de lembretes foi ultrapassado, portanto, não será possível agendar mais lembretes até dia primeiro do próximo mês.'} trigger={outOfRemindersPopUp} setTrigger={setOutOfRemindersPopUp}></PopUp>
      <PopUp title={'Algo deu errado'} content={'Parece que você não adquiriu lembretes ainda, por favor entre em contato para adquirir lembretes!'} trigger={noneRemindersPopUp} setTrigger={setNoneRemindersPopUp}></PopUp>
    </FormContainer> : <FormContainer title="Você não pode agendar um lembrete antes de entrar em sua conta."><div></div></FormContainer>}
    </>
  );
}

export default Register;

