'use client';

import './styles.css';
import Book from '../Book/Book';
import Link from 'next/link';

import BookType from '@/types/types.d';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';


const fetchBooks = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/books');
  const books: BookType[] = await res.json();
  return books;
};

const fetchBooksByUser = async (jwt: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/bookuser', {
    headers: {
      'Authorization': `Bearer ${jwt}`
    },
    });
  const books: BookType[] = await res.json();
  return books;
};


function BooksContainer({advertisement}: {advertisement: boolean}) {
  const [books, setBooks] = useState<BookType[]>([]);
  const {data: session} = useSession();
  const jwt = session?.jwt;

useEffect(() => {
  (async function() {
    if (session) {
        if (jwt !== undefined) {
          if (advertisement === false) {
            const books = await fetchBooks();
            setBooks(books);
          } else {
            const books = await fetchBooksByUser(jwt);
            setBooks(books);
          }
        }
      } else {
        const books = await fetchBooks();
        setBooks(books);
      }
  })();
}, [advertisement, jwt, session]);


  return (
    <section className="container">
      <div className="books">
        {(books.length > 0) ? books.map((book) => (
          <Link key={book.idbook} href={`/${book.idbook}`}>
            <Book idbook={book.idbook} name={book.name} price={book.price} img_src={book.img_src} description={book.description}></Book>
          </Link>
        )) : <div className="empty-div">No books found</div>}
      </div>
    </section>
  );
}

export default BooksContainer;
