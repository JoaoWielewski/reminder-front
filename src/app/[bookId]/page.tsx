'use client';

/* eslint-disable @next/next/no-img-element */
import BookType from '@/types/types';
import './styles.css';
import { CartContext } from '../components/CartContext/page';
import { useContext, useState, useEffect } from 'react';
import PopUp from '../components/PopUp/page';
import { useSession } from 'next-auth/react';

type PageProps = {
  params: {
    bookId: string;
  }
}

const fetchBook = async (id: string) => {
  const res = await fetch(`http://localhost:8080/books/${id}`);
  const book: BookType = await res.json();
  return book;
};


function BookPage({ params: { bookId }}: PageProps) {
  const [book, setBook] = useState<BookType | null>(null);
  const [errorPopUp, setErrorPopUp] = useState(false);
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [notLoggedPopUp, setNotLoggedPopUp] = useState(false);
  const { items, addToCart } = useContext(CartContext);
  const { data: session } = useSession();

  useEffect(() => {
    (async function() {
      const book = await fetchBook(bookId);
      setBook(book);
    })();
  }, [bookId]);


  if (!book) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    const alreadyAdded = items.some(object => object.idbook === book.idbook);

    if (session) {
      if (!alreadyAdded) {
        addToCart(book.idbook, book.name, book.price, book.img_src);
        setSuccessPopUp(true);
      } else {
        setErrorPopUp(true);
      }
    } else {
      setNotLoggedPopUp(true);
    }

  };

  return (
    <section className="book-page-container">
      <div className="book-page-div">
        <div className="image-div">
          <img
            src={book.img_src}
            alt=""
            className="book-page-img"
          />
        </div>
        <div className="book-page-separator"></div>
        <div className="book-data">
          <h1 className="book-page-name">{book.name}</h1>
          <h2 className="book-page-price">Price:${book.price}</h2>
        </div>
        <button className="cart-btn" onClick={handleClick}>Add to Cart</button>
      </div>
      <PopUp title={'Something went wrong'} content={'This book has already been added to you cart.'} trigger={errorPopUp} setTrigger={setErrorPopUp}></PopUp>
      <PopUp title={'Success!'} content={'The book was added to your cart.'} trigger={successPopUp} setTrigger={setSuccessPopUp}></PopUp>
      <PopUp title={'Something went wrong'} content={'You must be logged in order to add a book to your cart.'} trigger={notLoggedPopUp} setTrigger={setNotLoggedPopUp}></PopUp>
    </section>
  );
}

export default BookPage;

