'use client';

import './styles.css';
import Book from '../Book/Book';
import SearchBar from '../SearchBar/SearchBar';
import Link from 'next/link';

import BookType from '@/types/types.d';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Loading from '../Loading/Loading';


const fetchBooks = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/books');
    const books: BookType[] = await res.json();
    return books;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchBooksBySearch = async (searchValue: string) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/books/search/${searchValue}`);
    const books: BookType[] = await res.json();
    return books;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchBooksByUser = async (jwt: string) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/booksuser', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      },
      });
    const books: BookType[] = await res.json();
    return books;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchBooksByUserBySearch = async (jwt: string, searchValue: string) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/booksuser/search/${searchValue}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      },
      });
    const books: BookType[] = await res.json();
    return books;
  } catch (error) {
    console.log(error);
    return [];
  }
};


function BooksContainer({advertisement}: {advertisement: boolean}) {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);
  const [justSearched, setJustSearched] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const {data: session} = useSession();
  const jwt = session?.jwt;

useEffect(() => {
  setLoading(true);
  (async function() {
    let fetchedBooks = [];
    if (!searched || searchValue === '') {
      fetchedBooks = session && jwt !== undefined && advertisement ? await fetchBooksByUser(jwt) : await fetchBooks();
    } else {
      fetchedBooks = session && jwt !== undefined && advertisement ? await fetchBooksByUserBySearch(jwt, searchValue) : await fetchBooksBySearch(searchValue);
    }
    setBooks(fetchedBooks);
    setJustSearched(false);
    setLoading(false);
  })();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [advertisement, jwt, session, searched, justSearched]);

const handleSearch = () => {
  setSearched(true);
  setJustSearched(true);
};

  return (
    <section className="container">
      <SearchBar disabled={loading} onChangeFunction={setSearchValue} onClickFunction={handleSearch} advertisement={advertisement}></SearchBar>
      <div className={!advertisement ? 'books' : 'books advertisement-books'}>
        {!loading ?
        (books.length > 0) ? books.map((book) => (
          <Link key={book.idbook} href={`/${book.idbook}`}>
            <Book idbook={book.idbook} name={book.name} price={book.price} img_src={book.img_src} description={book.description}></Book>
          </Link>
        )) : <div className="empty-div">No books found</div> : <Loading></Loading>}
      </div>
    </section>
  );
}

export default BooksContainer;
