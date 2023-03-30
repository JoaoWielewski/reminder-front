import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartContext } from '@/components/CartContext/CartContext';
import { EditContext } from '@/components/EditContext/EditContext';
import BookPage from './page';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import CartProvider from '@/components/CartContext/CartContext';
import EditProvider from '@/components/EditContext/EditContext';

jest.mock('next-auth/react');

const mockFetch = (response: any) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
    })
  );
};

describe('<BookPage />', () => {
  const mockedBook = {
    idbook: '1',
    name: 'Book name',
    description: 'Book description',
    price: 9.99,
    img_src: 'http://example.com/image.jpg'
  };

  const mockedRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render BookPage with mocked book', async () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    mockFetch(mockedBook);

    render(
      <CartProvider>
      <EditProvider>
        <BookPage params={{ bookId: '1' }}></BookPage>
      </EditProvider>
      </CartProvider>
    );

    await waitFor(() => {
      (useSession as jest.Mock).mockReturnValue(mockSession);

      expect(screen.findByText(mockedBook.name)).toBeInTheDocument();
      expect(screen.getByText(mockedBook.description)).toBeInTheDocument();
      expect(screen.getByText(`$${mockedBook.price}`)).toBeInTheDocument();
      expect(screen.getByAltText(mockedBook.name)).toBeInTheDocument();
    });
  });

});