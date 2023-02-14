import './styles.css';
import CartElement from '../CartElement/page';
import BookType from '@/types/types';
import { CartContext } from '../CartContext/page';
import { useContext } from 'react';


function CartContainer() {
  const { items } = useContext(CartContext);

  if (!items) return;

  const books = items;

  function totalPrice() {
    let total = 0;
    books.map((book) => (total += book.price));
    return total;
  }

  return (
    <section className="cart-page">
      <h1 className="cart-h1">Cart</h1>
      <div className="cart-container-container">
        {books.map((book) => (
          <CartElement key={book.idbook} idbook={book.idbook} name={book.name} price={book.price} img_src={book.img_src} ></CartElement>
        ))}
        <h1 className="total-h1">Total: ${totalPrice()}</h1>
        {books.length > 0 && <button className="pay-btn">Pay</button>}
      </div>
    </section>
  );
}

export default CartContainer;
