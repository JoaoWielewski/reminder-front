import './styles.css';
import Book from '../Book/page';
import Link from 'next/link';

import BookType from '@/types/types.d';

const fetchBooks = async () => {
  const res = await fetch('http://localhost:8080/books');
  const books: BookType[] = await res.json();
  return books;
};

async function BooksContainer() {
  const books = await fetchBooks();

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
