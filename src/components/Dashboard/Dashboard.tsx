'use client';

import { ReminderType } from '@/types/types';
import { faBackwardStep, faCirclePlus, faFileLines, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { SetStateAction, useEffect, useState } from 'react';
import ConfirmationPopUp from '../ConfirmationPopUp/ConfirmationPopUp';
import Loading from '../Loading/Loading';
import PopUp from '../PopUp/PopUp';
import SearchBar from '../SearchBar/SearchBar';
import './styles.css';

const fetchReminders = async (jwt: string, page: number) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/reminders?page=${page}&limit=10`, {
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

const fetchRemindersBySearch = async (jwt: string, searchValue: string, page: number) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/reminders/search?query=${searchValue}&page=${page}&limit=10`, {
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

const fetchRemindersCount = async (jwt: String) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/reminders/count`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    });
    const count: number = await res.json();
    return count;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const fetchRemainingReminders = async (jwt: String) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/doctor`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    });
    const user = await res.json();
    return user.remainingReminders;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const deleteReminder = async (jwt: string, reminderId: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/reminder/${reminderId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${jwt}`
    },
  });
  return res;
};

function Dashboard() {
  const [reminders, setReminders] = useState<ReminderType[]>([]);
  const [remindersCount, setRemindersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);
  const [justSearched, setJustSearched] = useState(false);
  const [justDeleted, setJustDeleted] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [successDeletePopUp, setSuccessDeletePopUp] = useState(false);
  const [failDeletePopUp, setFailDeletePopUp] = useState(false);
  const [idToBeDeleted, setIdToBeDeleted] = useState('');
  const [page, setPage] = useState(1);
  const [remainingReminders, setRemainingReminders] = useState(0);

  const {data: session} = useSession();
  const jwt = session?.jwt;

  useEffect(() => {
    setLoading(true);
    (async function() {
      let fetchedReminders: SetStateAction<ReminderType[]> = [];
      if (session?.jwt) {
        setRemainingReminders(await fetchRemainingReminders(session.jwt));
      }
      if (session?.jwt) {
        setRemindersCount(await fetchRemindersCount(session.jwt));
      }
      if (!searched || searchValue === '') {
        if (session?.jwt) {
          fetchedReminders = await fetchReminders(session.jwt, page);
        }
      } else {
        if (session?.jwt) {
          fetchedReminders = await fetchRemindersBySearch(session.jwt, searchValue, page);
        }
      }
      if (searched && searchValue === '') {
        setSearched(false);
      }
      setReminders(fetchedReminders);
      setJustSearched(false);
      setJustDeleted(false);
      setLoading(false);
    })();
  }, [jwt, session, searched, justSearched, justDeleted, page]);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setSearched(true);
      setJustSearched(true);
    }
  };

  const handleClearSearch = (event: any) => {
    event.target.parentNode.parentNode.querySelector('input').value = '';
    setSearchValue('');
    setSearched(false);
  };

  const handleDelete = async (event: any) => {
    setIdToBeDeleted(event.target.parentNode.id);
    setDeletePopUp(true);
  };

  const handleForward = () => {
    setPage(page + 1);
  };

  const handleBackwards = () => {
    setPage(page - 1);
  };

  const isSureDelete = async (sure: boolean) => {
    if (sure) {
      if (session && session.jwt) {
        const result = await deleteReminder(session.jwt, idToBeDeleted);

        if (result) {
          setSuccessDeletePopUp(true);
          setJustDeleted(true);
        } else {
          setFailDeletePopUp(true);
        }
      }
    }
  };

  return (
    <div className='dashboard'>
      <div className='dashboard-name'>Painel</div>
      <div className='dashboard-info'>
        <FontAwesomeIcon icon={faFileLines} className="info-icon" />
        <div className='info-texts'>
          <div className='info-name'>Lembretes restantes neste mês</div>
          <div className='info-info'>{remainingReminders}</div>
        </div>
      </div>
      <div className='table-div'>
        <div className='table-name'>Lembretes</div>
        <Link href="/agendar">
          <FontAwesomeIcon icon={faCirclePlus} className="plus-icon" />
        </Link>
        <SearchBar disabled={loading} onChangeFunction={setSearchValue} onKeyDownFunction={handleKeyDown} searched={searched} clearSearchFunction={handleClearSearch}></SearchBar>
        <table>
  <thead>
    <tr>
      <th className='padding-left'>SITUAÇÃO</th>
      <th>NOME DO PACIENTE</th>
      <th>CELULAR DO PACIENTE</th>
      <th>DATA DE RETORNO ESPERADA</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  {!loading ?
        (reminders.length > 0) ? reminders.map((reminder) => (
          <>
            <div className={reminder.status === 'active' ? 'yellow-circle' : 'green-circle'}></div>
            <tr key={reminder.id} id={reminder.id}>
                <td className='padding-left'>{reminder.status === 'active' ? 'Aguardando envio' : 'Mensagem enviada'}</td>
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
                <td className='remove' onClick={handleDelete}>Apagar</td>
            </tr>
            </>
        )) : <div className="empty-div">Nenhum lembrete encontrado</div> : <Loading></Loading>}
  </tbody>
</table>
  <div className='pagination-div'>
    {page === 1 ?
    <div className='backwards-page-disabled'><FontAwesomeIcon icon={faBackwardStep} className="step-icon" /></div>
     : <div className='backwards-page' onClick={handleBackwards}><FontAwesomeIcon icon={faBackwardStep} className="step-icon" /></div>}

    <div className='current-page'>{page}</div>
    {remindersCount > page * 10 ? <div className='forward-page' onClick={handleForward}><FontAwesomeIcon icon={faForwardStep} className="step-icon" /></div>
     : <div className='forward-page-disabled'><FontAwesomeIcon icon={faForwardStep} className="step-icon" /></div>}

  </div>
      </div>
      <ConfirmationPopUp
    title={''}
    content={'Você quer mesmo apagar este lembrete?'}
    trigger={deletePopUp}
    setTrigger={setDeletePopUp}
    onDialog={isSureDelete}
    />
    <PopUp title={''} content={'O lembrete foi apagado com sucesso.'} trigger={successDeletePopUp} setTrigger={setSuccessDeletePopUp}></PopUp>
    <PopUp title={''} content={'Ocorreu um erro ao tentar apagar o lembrete, tente novamente mais tarde...'} trigger={failDeletePopUp} setTrigger={setFailDeletePopUp}></PopUp>
    </div>
  );
}

export default Dashboard;







