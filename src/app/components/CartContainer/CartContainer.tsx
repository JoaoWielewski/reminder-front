'use client';

import './styles.css';
import CartElement from '../CartElement/CartElement';
import { CartContext } from '../CartContext/CartContext';
import { useContext, useState } from 'react';
import ConfirmationPopUp from '../ConfirmationPopUp/ConfirmationPopUp';
import PopUp from '../PopUp/PopUp';
import { sendEmailOnPayment } from '@/utils/send-email';
import { useSession } from 'next-auth/react';


function CartContainer() {
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [surePopUp, setSurePopUp] = useState(false);
  const { items, removeAllFromCart } = useContext(CartContext);
  const { data: session } = useSession();

  if (!items) return <></>;

  const books = items;

  function totalPrice() {
    let total = 0;
    books.map((book) => (total += book.price));
    return total;
  }

  const handlePay = () => {
    setSurePopUp(true);
  };

  const isSure = (sure: boolean) => {
    if (sure) {
      setSuccessPopUp(true);
      if (session?.user?.email) {
        sendEmailOnPayment(session?.user?.email, books);
      }
      removeAllFromCart();
    }
  };

  return (
    <section className="cart-page">
      <h1 className="cart-h1">Cart</h1>
      <div className="cart-container-container">
        {books.map((book) => (
          <CartElement key={book.idbook} idbook={book.idbook} name={book.name} price={book.price} img_src={book.img_src} description={book.description} ></CartElement>
        ))}
        {(books.length > 0) ? <>
          <h1 className="total-h1">Total: ${totalPrice()}</h1>
          <button className="pay-btn" onClick={handlePay}>Pay</button>
        </> : <h1 className="total-h1">Your cart is empty</h1>}
      </div>
      <ConfirmationPopUp
        title={'Sure?'}
        content={'Are you sure you want to pay now?'}
        trigger={surePopUp}
        setTrigger={setSurePopUp}
        onDialog={isSure}
      />
      <PopUp
        title={'Success!'}
        content={'The purchase has been successfully completed.'}
        trigger={successPopUp}
        setTrigger={setSuccessPopUp}
      />
    </section>
  );
}

export default CartContainer;
