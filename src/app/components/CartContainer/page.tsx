import './styles.css';
import CartElement from '../CartElement/page';
import BookType from '@/types/types';

const books: BookType[] = [
  {
    id: 1,
    name: 'The Fellowship of the Ring (The Lord of the rings)',
    price: 59,
    img: 'https://kbimages1-a.akamaihd.net/47047012-399c-4ae3-aade-cd4c2a10e8e7/1200/1200/False/the-fellowship-of-the-ring-the-lord-of-the-rings-book-1-1.jpg',
  },
  {
    id: 2,
    name: 'A New Dawn (Star Wars)',
    price: 69,
    img: 'https://m.media-amazon.com/images/I/91hIKLn14ZL.jpg',
  },
];

function CartContainer() {
  function totalPrice() {
    let total = 0;
    books.map((book) => (total += book.price));
    return total;
  }

  return (
    <section className="cart-page">
      <h1 className="cart-h1">Cart</h1>
      <div className="cart-container">
        {books.map((book) => (
          <CartElement key={book.id} id={book.id} name={book.name} price={book.price} img={book.img}></CartElement>
        ))}
        <h1 className="total-h1">Total: ${totalPrice()}</h1>
        <button className="pay-btn">Pay</button>
      </div>
    </section>
  );
}

export default CartContainer;
