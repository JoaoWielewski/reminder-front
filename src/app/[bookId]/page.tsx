/* eslint-disable @next/next/no-img-element */
import BookType from '@/types/types';
import './styles.css';

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

async function BookPage({ params: { bookId }}: PageProps) {
  const book = await fetchBook(bookId);

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
        <button className="cart-btn">Add to Cart</button>
      </div>
    </section>
  );
}

export default BookPage;

//
//{
//  id: 1,
//  name: 'The Fellowship of the Ring (The Lord of the rings)',
//  price: 59,
//  img: 'https://kbimages1-a.akamaihd.net/47047012-399c-4ae3-aade-cd4c2a10e8e7/1200/1200/False/the-fellowship-of-the-ring-the-lord-of-the-rings-book-1-1.jpg',
//},
//
