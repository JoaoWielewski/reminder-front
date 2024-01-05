'use client';

import SearchBar from '../SearchBar/SearchBar';
import './styles.css';

import { ReminderType } from '@/types/types.d';
import { useSession } from 'next-auth/react';
import { SetStateAction, useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmationPopUp from '../ConfirmationPopUp/ConfirmationPopUp';
import PopUp from '../PopUp/PopUp';

const fetchReminders = async (jwt: string) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/reminders', {
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    });
    const reminders: ReminderType[] = await res.json();
    return reminders;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchRemindersBySearch = async (searchValue: string) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/reminders/${searchValue}`);
    const reminders: ReminderType[] = await res.json();
    return reminders;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const deleteReminder = async (jwt: string, reminderId: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/reminder/${reminderId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${jwt}`
    },
  });
  console.log(res);
  return res;
};


function RemindersContainer() {
  const [reminders, setReminders] = useState<ReminderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);
  const [justSearched, setJustSearched] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [successDeletePopUp, setSuccessDeletePopUp] = useState(false);
  const [failDeletePopUp, setFailDeletePopUp] = useState(false);
  const [idToBeDeleted, setIdToBeDeleted] = useState('');
  const {data: session} = useSession();
  const jwt = session?.jwt;

useEffect(() => {
  setLoading(true);
  (async function() {
    let fetchedReminders: SetStateAction<ReminderType[]> = [];
    if (!searched || searchValue === '') {
      if (session?.jwt) {
        fetchedReminders = await fetchReminders(session.jwt);
      }
    } else {
      fetchedReminders = await fetchRemindersBySearch(searchValue);
    }
    setReminders(fetchedReminders);
    setJustSearched(false);
    setLoading(false);
  })();
}, [jwt, session, searched, justSearched]);

const handleSearch = () => {
  setSearched(true);
  setJustSearched(true);
};

const handleDelete = async (event: any) => {
  setIdToBeDeleted(event.target.parentNode.parentNode.parentNode.parentNode.id);
  setDeletePopUp(true);
};

const isSureDelete = async (sure: boolean) => {
  if (sure) {
    if (session && session.jwt) {
      const result = await deleteReminder(session.jwt, idToBeDeleted);

      if (result) {
        setSuccessDeletePopUp(true);
      } else {
        setFailDeletePopUp(true);
      }
    }
  }
};

  return (
    <section className="container">
      <SearchBar disabled={loading} onChangeFunction={setSearchValue} onClickFunction={handleSearch}></SearchBar>
      <div className='books advertisement-books'>
      <table>
        <thead>
            <tr>
                <th>Status</th>
                <th>Nome do paciente</th>
                <th>Celular do paciente</th>
                <th>Data de retorno esperada</th>
                <th>Apagar</th>
            </tr>
        </thead>
        <tbody>
        {!loading ?
        (reminders.length > 0) ? reminders.map((reminder) => (
            <tr key={reminder.id} id={reminder.id}>
                <td>{reminder.status === 'active' ? 'Aguardando' : 'Mensagem enviada'}</td>
                <td>{reminder.pacientName}</td>
                <td>{reminder.pacientPhone}</td>
                <td>{new Date(reminder.expectedReturnDate).toLocaleDateString(
                  'pt-BR',
                  {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  }
                  )}
                </td>
                <td><label htmlFor="check" className="trash" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} className="trash-icon" />
      </label></td>
            </tr>
        )) : <div className="empty-div">Nenhum lembrete encontrado</div> : <Loading></Loading>}
        </tbody>
    </table>
      </div>
      <ConfirmationPopUp
        title={'Certeza?'}
        content={`Você quer mesmo apagar o lembrete deste paciente?`}
        trigger={deletePopUp}
        setTrigger={setDeletePopUp}
        onDialog={isSureDelete}
      />
      <PopUp title={'Successo!'} content={'O lembrete foi apagado com sucesso.'} trigger={successDeletePopUp} setTrigger={setSuccessDeletePopUp}></PopUp>
      <PopUp title={'Algo deu errado'} content={'Ocorreu um erro ao tentar apagar o lembrete, tente novamente mais tarde...'} trigger={failDeletePopUp} setTrigger={setFailDeletePopUp}></PopUp>
    </section>
  );
}

export default RemindersContainer;
