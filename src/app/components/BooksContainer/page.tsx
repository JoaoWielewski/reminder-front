'use client';

import './styles.css';
import Book from '../Book/page';
import Link from 'next/link';

import BookType from '@/types/types.d';
import { use } from 'react';
import { useSession } from 'next-auth/react';

type cachedFetchesType = {
  jwt: string
}

const fetchBooks = fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/books').then((res) => res.json());


const cachedFetches = {};
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

  if (jwt !== undefined) {
    if (advertisement === false) {
      books = use(fetchBooks);
    } else {
      books = use(cachedFetch(jwt));
    }
  }

  return (
    <section className="container">
      <div className="books">
        {books.map((book) => (
          <Link key={book.idbook} href={`/${book.idbook}`}>
            <Book idbook={book.idbook} name={book.name} price={book.price} img_src={book.img_src}></Book>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BooksContainer;
