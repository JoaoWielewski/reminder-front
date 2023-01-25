import './styles.css';
import BooksContainer from '../components/BooksContainer/page';
import Link from 'next/link';

function Advertisement() {
  return (
    <>
      <div className="advertisement-container">
        <Link href="/advertisement/register">
          <button className="advertisement-btn">Add a book to sell</button>
        </Link>
        <h1 className="advertisement-h">Your Advertisement</h1>
      </div>
      <BooksContainer></BooksContainer>
    </>
  );
}

export default Advertisement;
