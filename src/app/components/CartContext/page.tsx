'use client';

import { createContext, useState } from 'react';
import BookType from '@/types/types';

type CartContextType = {
  items: BookType[];
  addToCart: (idbook: number, name: string, price: number, img_src: string) => void;
  removeFromCart: (idbook: number) => void;
  removeAllFromCart: () => void;
 };

export const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  removeAllFromCart: () => {},
});

export function CartProvider({children}: {children: React.ReactNode}) {
  const [items, setItems] = useState<BookType[]>([]);

  const addToCart = (idbook: number, name: string, price: number, img_src: string) => {
    setItems((prevState) => [...prevState, { idbook, name, price, img_src }]);
  };

  const removeFromCart = (idbook: number) => {
    setItems(prevState => prevState.filter(item => item.idbook !== idbook));
  };

  const removeAllFromCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, removeAllFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;