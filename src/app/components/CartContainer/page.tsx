import './styles.css';
import CartElement from '../CartElement/page';
import BookType from '@/types/types';
import { CartContext } from '../CartContext/page';
import { useContext, useState } from 'react';
import ConfirmationPopUp from '../ConfirmationPopUp/page';
import PopUp from '../PopUp/page';


function CartContainer() {
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [surePopUp, setSurePopUp] = useState(false);
  const { items, removeAllFromCart } = useContext(CartContext);

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
      removeAllFromCart();
    }
  };

  return (
    <section className="cart-page">
      <h1 className="cart-h1">Cart</h1>
      <div className="cart-container-container">
        {books.map((book) => (
          <CartElement key={book.idbook} idbook={book.idbook} name={book.name} price={book.price} img_src={book.img_src} ></CartElement>
        ))}
        {books.length > 0 && <>
          <h1 className="total-h1">Total: ${totalPrice()}</h1>
          <button className="pay-btn" onClick={handlePay}>Pay</button>
        </>}
        {!books.length && <h1 className="total-h1">Your cart is empty</h1>}
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
