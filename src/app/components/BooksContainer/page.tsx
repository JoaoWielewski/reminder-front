'use client';

import './styles.css';
import Book from '../Book/page';
import Link from 'next/link';

import BookType from '@/types/types.d';
import { use } from 'react';
import { useSession } from 'next-auth/react';

const fetchBooks = fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/books').then((res) => res.json());

const cachedFetches: Record<string, Promise<any>> = {};
const cachedFetch = (jwt: string) => {
  if (!cachedFetches[jwt]) {
    cachedFetches[jwt] = fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/bookuser', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      },
    }).then((res) => res.json());
  }
  return cachedFetches[jwt];
};


function BooksContainer({advertisement}: {advertisement: boolean}) {
  const {data: session} = useSession();
  const jwt = session?.jwt;

  let books: BookType[] = [];

  if (session) {
    if (jwt !== undefined) {
      if (advertisement === false) {
        books = use(fetchBooks);
      } else {
        books = use(cachedFetch(jwt));
      }
    }
  } else {
    books = use(fetchBooks);
  }


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
