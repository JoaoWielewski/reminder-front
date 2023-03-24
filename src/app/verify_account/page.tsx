'use client';

import PopUp from '@/components/PopUp/PopUp';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const fetchVerifyAccount = async (key: string) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/verify_account/${key}`, {
        method: 'POST',
      });

      if (res.status === 201) {
        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
};

function VerifyAccount() {
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [failurePopUp, setFailurePopUp] = useState(false);
  const [successExecuted, setSuccessExecuted] = useState(false);
  const [failureExecuted, setFailureExecuted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (window) {
      const searchParam = new URLSearchParams(window.location.search);
      const key = searchParam.get('key');

      if (key) {
        (async function() {
          const result = await fetchVerifyAccount(key);
          if (result) {
            setSuccessPopUp(true);
            setSuccessExecuted(true);
          } else {
            setFailurePopUp(true);
            setFailureExecuted(true);
          }
        })();
      }
    }
  }, []);

  useEffect(() => {
    if (successExecuted && !successPopUp) {
      router.push('/login');
    } else if (failureExecuted && !failurePopUp) {
      router.push('/signup');
    }
  }, [failureExecuted, failurePopUp, router, successExecuted, successPopUp]);

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
        content={'Something went wrong, try creating your account again soon...'}
        trigger={failurePopUp}
        setTrigger={setFailurePopUp}
      />
    </>
  );
}

export default VerifyAccount;
