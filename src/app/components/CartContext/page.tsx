'use client';

import { createContext, useState } from 'react';
import BookType from '@/types/types';

type CartContextType = { items: BookType[]; addToCart: (idbook: number, name: string, price: number, img_src: string) => void };

export const CartContext = createContext<CartContextType>({ items: [], addToCart: () => {} });

export function CartProvider({children}: {children: React.ReactNode}) {
  const [items, setItems] = useState<BookType[]>([]);

  const addToCart = (idbook: number, name: string, price: number, img_src: string) => {
    setItems((prevState) => [...prevState, { idbook, name, price, img_src }]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;