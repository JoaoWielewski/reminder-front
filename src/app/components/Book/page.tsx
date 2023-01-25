/* eslint-disable @next/next/no-img-element */
import './styles.css';
import BookType from '@/types/types';

function Book(params: BookType) {
  return (
    <div className={`book`}>
      <div className="img-container">
        <img src={params.img_src} alt="" className="book-img" />
      </div>
      <div className="book-separator"></div>
      <h1 className="book-name">{params.name}</h1>
      <h2 className="book-price">Price: ${params.price}</h2>
    </div>
  );
}

export default Book;
