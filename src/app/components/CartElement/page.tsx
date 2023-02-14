/* eslint-disable @next/next/no-img-element */
import './styles.css';
import BookType from '@/types/types';
import { CartContext } from '../CartContext/page';
import { useContext, useState } from 'react';
import ConfirmationPopUp from '../ConfirmationPopUp/page';

function CartElement(props: BookType) {
  const [surePopUp, setSurePopUp] = useState(false);
  const { removeFromCart } = useContext(CartContext);

  const handleRemove = () => {
    setSurePopUp(true);
  };

  const isSure = (sure: boolean) => {
    if (sure) {
      removeFromCart(props.idbook);
    }
  };

  return (
    <div className="cart-div">
      <div className="cart-div-img">
        <img src={props.img_src} alt="" className="cart-img" />
      </div>
      <div className="cart-data">
        <h1 className="cart-name">{props.name}</h1>
        <h2 className="cart-price">Price: ${props.price}</h2>
        <button className="cart-remove" onClick={handleRemove}>Remove</button>
      </div>
      <ConfirmationPopUp
        title={'Sure?'}
        content={`Are you sure you want to remove ${props.name} from you cart?`}
        trigger={surePopUp}
        setTrigger={setSurePopUp}
        onDialog={isSure}
      />
    </div>
  );
}

export default CartElement;
