import './styles.css';
import BooksContainer from './components/BooksContainer/page';

function Home() {
  return (
    <>
      <h1>Books</h1>
      {/* @ts-ignore */}
      <BooksContainer></BooksContainer>
    </>
  );
}

export default Home;
