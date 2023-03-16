'use client';

import { createContext, useState } from 'react';
import BookType from '@/types/types';

export type EditContextType = {
  item: BookType | undefined,
  addToItem: (book: BookType) => void,
  clearItem: () => void,
}

export const EditContext = createContext<EditContextType>({
  item: undefined,
  addToItem: () => {},
  clearItem: () => {},
});

function EditProvider({children}: {children: React.ReactNode}) {
  const [item, setItem] = useState<BookType>();

  const addToItem = (book: BookType) => {
    setItem(book);
  };

  const clearItem = () => {
    setItem(undefined);
  };

  return (
      <EditContext.Provider value={{ item, addToItem, clearItem }}>
        {children}
      </EditContext.Provider>
  );
}

export default EditProvider;