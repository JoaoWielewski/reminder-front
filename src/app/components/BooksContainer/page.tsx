'use client';

import './styles.css';
import Book from '../Book/page';
import Link from 'next/link';

import BookType from '@/types/types.d';
import { use, useState } from 'react';
import { useSession } from 'next-auth/react';

const fetchBooks = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/books');
  const books: BookType[] = await res.json();
  return books;
};

const fetchBooksByUser = async (userId: number) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/books/${userId}`);
  const books: BookType[] = await res.json();
  return books;
};

function BooksContainer({advertisement}: {advertisement: boolean}) {
  const {data: session} = useSession();
  let books: BookType[] = [];

  if (advertisement) {
    books = use(fetchBooksByUser(session?.id!));
  } else {
    books = use(fetchBooks());
  }
  console.log(books);

  return (
    <section className="container">
      <div className="books">
        {books.map((book) => (
          <Link key={book.id} href={`/${book.id}`}>
            <Book id={book.id} name={book.name} price={book.price} img_src={book.img_src}></Book>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BooksContainer;
