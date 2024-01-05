'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './styles.css';

import { EditContext } from '@/components/EditContext/EditContext';
import FormButton from '@/components/FormButton/FormButton';
import FormContainer from '@/components/FormContainer/FormContainer';
import FormLoading from '@/components/FormLoading/FormLoading';
import Input from '@/components/Input/Input';
import InputSelect from '@/components/InputSelect/InputSelect';
import PopUp from '@/components/PopUp/PopUp';
import { useRouter } from 'next/navigation';

type ReminderCreationType = {
  name: string;
  quantity: string;
  phone: string;
  unit: string
};

async function createReminder(data: ReminderCreationType, jwt: string) {

  const params = {
    pacientName: data.name,
    periodQuantity: parseInt(data.quantity),
    periodType: data.unit,
    pacientPhone: data.phone,
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
  const [outOfRemindersPopUp, setOutOfRemindersPopUp] = useState(false);
  const router = useRouter();
  const {data: session, status} = useSession();

  const schema = yup.object().shape({
    name: yup.string().max(100, 'Nome muito longo').required('Insira o nome, por favor.'),
    quantity: yup.string()
    .test('is-number', 'Selecione a unidade de tempo e insira sua quantidade', (value) => {
      if (value === undefined) {
        return false;
      }
      const floatValue = parseFloat(value);
      return !isNaN(floatValue);
    })
    .required('Insira a quantidade da unidade, por favor.'),
    phone: yup.string().max(100, 'Número muito longo').required('Insira o número, por favor.'),
  });

  const { register, handleSubmit, formState: { errors }, setValue} = useForm<ReminderCreationType>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!successPopUp && executed) {
      router.push('/');
    }
  }, [executed, router, successPopUp]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const radioInputs =document.querySelectorAll('.radio-input') as unknown as HTMLInputElement[];

    if (radioInputs[0].checked) {
      setValue('unit', 'day');
    } else if (radioInputs[1].checked) {
      setValue('unit', 'month');
    } else if (radioInputs[2].checked) {
      setValue('unit', 'year');
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

    const createReminderResponse = await createReminder(data, session?.jwt!);
    if (createReminderResponse.status === 201) {
      setSuccessPopUp(true);
      setExecuted(true);
    } else {
      const responseJson = await createReminderResponse.json();
      if (responseJson.code === 'PLUGIN_SERVICE_OUT_OF_REMINDERS') {
        setOutOfRemindersPopUp(true);
      } else {
        setErrorPopUp(true);
      }
    }

    setValue('name', '');
    setValue('quantity', '');
    setValue('phone', '');
    setValue('unit', '');
    setLoading(false);
  });

  function getUnit(unit: string) {
    if (unit === 'day') {
      setUnitTitle('Quantidade de dias');
    } else if (unit === 'month') {
      setUnitTitle('Quantidade de meses');
    } else if (unit === 'year') {
      setUnitTitle('Quantidade de anos');
    }
    setSelectDisabled(false);
  }

  return (
    <>
    {session ?
    <FormContainer title={'Agendar lembrete'}>
      <form onSubmit={onSubmit}>
        <Input type="text" title="Nome do paciente" error={errors.name?.message?.toString()} disabled={loading} register={register('name')} ></Input>
        <Input type="text" title="Celular do paciente" error={errors.phone?.message?.toString()} disabled={loading} register={register('phone')} ></Input>
        <InputSelect title="a" error={errors.unit?.message?.toString()} disabled={loading} register={register('unit')} onChangeFunction={getUnit}></InputSelect>
        <Input type="text" title={unitTitle} error={errors.quantity?.message?.toString()} disabled={loading || selectDisabled} register={register('quantity')}></Input>
        {!loading ?
         <FormButton title={'Agendar'} disabled={loading}></FormButton> :
         <FormLoading></FormLoading>
        }

      </form>
      <PopUp title={'Algo deu errado'} content={'Ocorreu um erro com a criação do lembrete, tente novamente mais tarde...'} trigger={errorPopUp} setTrigger={setErrorPopUp}></PopUp>
      <PopUp title={'Successo!'} content={'O lembrete foi agendado.'} trigger={successPopUp} setTrigger={setSuccessPopUp}></PopUp>
      <PopUp title={'Algo deu errado'} content={'O seu limite mensal de lembretes foi ultrapassado, portanto, não será possível agendar mais lembretes até dia primeiro do próximo mês.'} trigger={outOfRemindersPopUp} setTrigger={setOutOfRemindersPopUp}></PopUp>
    </FormContainer> : <FormContainer title="Você não pode agendar um lembrete antes de entrar em sua conta."><div></div></FormContainer>}
    </>
  );
}

export default Register;

