/* eslint-disable @next/next/no-img-element */
import './styles.css';
import BookType from '@/types/types';

function CartElement(params: BookType) {
  return (
    <div className="cart-div">
      <div className="cart-div-img">
        <img src={params.img_src} alt="" className="cart-img" />
      </div>
      <div className="cart-data">
        <h1 className="cart-name">{params.name}</h1>
        <h2 className="cart-price">Price: ${params.price}</h2>
        <button className="cart-remove">Remove</button>
      </div>
    </div>
  );
}

export default CartElement;
