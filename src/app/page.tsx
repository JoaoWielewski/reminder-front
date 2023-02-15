import './styles.css';
import BooksContainer from './components/BooksContainer/page';

function Home() {
  return (
    <>
      <h1 className="catalog-h1">Catalog</h1>
      <BooksContainer advertisement={false}></BooksContainer>
    </>
  );
}

export default Home;
