/* eslint-disable @next/next/no-img-element */
import './styles.css';
import BookType from '@/types/types';

function Book(params: BookType) {
  return (
    <div className="book">
      <div className="img-container">
        <img src={params.img_src} alt="" className="book-img" />
      </div>
      <div className="detail-container">
        <div className="book-name-container">
          <h1 className="book-name">{params.name}</h1>
        </div>
        <h2 className="book-price">${params.price}</h2>
      </div>
      <div className="add-cart">
        Buy Now
      </div>
    </div>
  );
}

export default Book;

//<div className="book-separator"></div>