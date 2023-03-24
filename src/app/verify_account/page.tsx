'use-client';

import PopUp from '@/components/PopUp/PopUp';
import { useEffect, useState } from 'react';
import './styles.css';

const fetchVerifyAccount = async (key: string) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/verify_account/${key}`, {
        method: 'POST',
      });

      return res.status;
    } catch (error) {
      console.log(error);
      return false;
    }
};

function VerifyAccount() {
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [failPopUp, setFailPopUp] = useState(false);

  useEffect(() => {
    

    (async function() {
      await fetchVerifyAccount(key);
    });
  }, []);

  return (
    <>
      <PopUp
        title={'Success!'}
        content={'Your account is now verified.'}
        trigger={successPopUp}
        setTrigger={setSuccessPopUp}
      />
      <PopUp
        title={'Oops...'}
        content={'Something went wrong, try again soon...'}
        trigger={failPopUp}
        setTrigger={setFailPopUp}
      />
    </>
  );
}

export default VerifyAccount;
