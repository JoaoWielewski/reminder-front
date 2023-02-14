'use client';

/* eslint-disable @next/next/no-img-element */
import BookType from '@/types/types';
import './styles.css';
import { CartContext } from '../components/CartContext/page';
import { useContext, useState, useEffect } from 'react';

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
  const { items, addToCart } = useContext(CartContext);

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

    if (!alreadyAdded) {
      addToCart(book.idbook, book.name, book.price, book.img_src);
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
    </section>
  );
}

export default BookPage;

