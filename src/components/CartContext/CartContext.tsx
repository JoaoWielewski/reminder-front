'use client';

import { createContext, useState } from 'react';
import BookType from '@/types/types';

type CartContextType = {
  items: BookType[];
  addToCart: (idbook: number, name: string, price: number, img_src: string, description: string) => void;
  removeFromCart: (idbook: number) => void;
  removeAllFromCart: () => void;
 };

export const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  removeAllFromCart: () => {},
});

function CartProvider({children}: {children: React.ReactNode}) {
  const [items, setItems2] = useState<BookType[]>([]);

  const addToCart = (idbook: number, name: string, price: number, img_src: string, description: string) => {
    console.log('add');
    setItems2((prevState) => [...prevState, { idbook, name, price, img_src, description }]);
  };

  const removeFromCart = (idbook: number) => {
    setItems2(prevState => prevState.filter(item => item.idbook !== idbook));
  };

  const removeAllFromCart = () => {
    setItems2([]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, removeAllFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;