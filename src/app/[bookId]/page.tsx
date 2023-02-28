/* eslint-disable react/no-unescaped-entities */
'use client';

/* eslint-disable @next/next/no-img-element */
import BookType from '@/types/types';
import './styles.css';
import { CartContext } from '@/components/CartContext/CartContext';
import { EditContext } from '@/components/EditContext/EditContext';
import { useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import PopUp from '@/components/PopUp/PopUp';
import ConfirmationPopUp from '@/components/ConfirmationPopUp/ConfirmationPopUp';

type PageProps = {
  params: {
    bookId: string;
  }
}

const fetchBook = async (id: string) => {
  const res = await fetch(`http://localhost:8080/books/${id}`);
  const book: BookType = await res.json();
  return book;
};

const fetchBookOwnerId = async (id: string) => {
  const res = await fetch(`http://localhost:8080/bookowner/${id}`);
  const owner: {id_user: number} = await res.json();
  return owner;
};

const deleteBook = async (jwt: string, bookId: number) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/deletebook/${bookId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${jwt}`
    },
  });
  const result = await res.json();
  return result;
};


function BookPage({ params: { bookId }}: PageProps) {
  const [book, setBook] = useState<BookType | null>(null);
  const [bookOwnerId, setBookOwnerId] = useState<number | null>(null);
  const [errorPopUp, setErrorPopUp] = useState(false);
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [notLoggedPopUp, setNotLoggedPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [successDeletePopUp, setSuccessDeletePopUp] = useState(false);
  const [failDeletePopUp, setFailDeletePopUp] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();
  const { items, addToCart } = useContext(CartContext);
  const { addToItem } = useContext(EditContext);
  const { data: session } = useSession();

  useEffect(() => {
    (async function() {
      const book = await fetchBook(bookId);
      setBook(book);

      const ownerId = await fetchBookOwnerId(bookId);
      setBookOwnerId(ownerId.id_user);
    })();
  }, [bookId]);

  useEffect(() => {
    if (!successDeletePopUp && deleted) {
      router.push('/advertisement');
    }
  });

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleAdd = () => {
    const alreadyAdded = items.some(object => object.idbook === book.idbook);

    if (session) {
      if (!alreadyAdded) {
        addToCart(book.idbook, book.name, book.price, book.img_src, book.description);
        setSuccessPopUp(true);
      } else {
        setErrorPopUp(true);
      }
    } else {
      setNotLoggedPopUp(true);
    }

  };

  const handleEdit = () => {
    addToItem(book);
    router.push('/advertisement/register');
  };

  const handleDelete = async () => {
    setDeletePopUp(true);
  };

  const isSureDelete = async (sure: boolean) => {
    if (sure) {
      if (session && session.jwt) {
        const result = await deleteBook(session.jwt, book.idbook);

        if (result) {
          setSuccessDeletePopUp(true);
          setDeleted(true);
        } else {
          setFailDeletePopUp(true);
        }
      }
    }
  };


  return (
    <section className="book-page-section">
      <div className="book-page-div">
        <h1 className="book-page-name-mobile">{book.name}</h1>
        <div className="image-div">
          <img
            src={book.img_src}
            alt=""
            className="book-page-img"
          />
        </div>
        <div className="book-data">
          <h1 className="book-page-name">{book.name}</h1>
          <h2 className="book-page-description">{book.description}</h2>
          <h3 className="book-page-price">${book.price}</h3>
          {session?.role === 'admin' && <button className="admin-delete-btn" onClick={handleDelete}>Admin delete</button>}
          {(session?.id !== bookOwnerId) ?
            <button className="cart-btn" onClick={handleAdd}>Add to Cart</button>
          : <>
              <button className="book-edit-btn" onClick={handleEdit}>Edit</button>
              <button className="book-delete-btn" onClick={handleDelete}>Delete</button>
            </>}
        </div>
      </div>
      <PopUp title={'Oops...'} content={'This book has already been added to you cart.'} trigger={errorPopUp} setTrigger={setErrorPopUp}></PopUp>
      <PopUp title={'Success!'} content={'The book was added to your cart.'} trigger={successPopUp} setTrigger={setSuccessPopUp}></PopUp>
      <PopUp title={'Something went wrong'} content={'You must be logged in order to add a book to your cart.'} trigger={notLoggedPopUp} setTrigger={setNotLoggedPopUp}></PopUp>
      <PopUp title={'Success!'} content={'The book has been successfully deleted.'} trigger={successDeletePopUp} setTrigger={setSuccessDeletePopUp}></PopUp>
      <PopUp title={'Something went wrong'} content={'You book couldn\'t be deleted, please try again soon...'} trigger={failDeletePopUp} setTrigger={setFailDeletePopUp}></PopUp>
      <ConfirmationPopUp
        title={'Sure?'}
        content={`Are you sure you want to delete your book ${book.name}?`}
        trigger={deletePopUp}
        setTrigger={setDeletePopUp}
        onDialog={isSureDelete}
      />
    </section>
  );
}

export default BookPage;


