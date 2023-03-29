import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import BooksContainer from './BooksContainer';
import BookType from '@/types/types';
// import books from './mock';

jest.mock("next-auth/react");

const mockFetch = (response: any) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
    })
  );
};

describe('BooksContainer component', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a loading indicator when it is loading', async () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    render(<BooksContainer advertisement={false} />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
  });


  it('should render books when books are fetched', async () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    const books = [
      { idbook: 1, name: 'Book 1', price: 10.99, img_src: 'book1.jpg', description: 'Lorem ipsum' },
      { idbook: 2, name: 'Book 2', price: 12.99, img_src: 'book2.jpg', description: 'Dolor sit amet' },
    ];

    mockFetch(books);

    render(<BooksContainer advertisement={false} />);

    await waitFor(() => {
      (useSession as jest.Mock).mockReturnValue(mockSession);

      expect(screen.queryByText('No books found')).not.toBeInTheDocument();
      expect(screen.getByText('Book 1')).toBeInTheDocument();
      expect(screen.getByText('$10.99')).toBeInTheDocument();

      expect(screen.getByText('Book 2')).toBeInTheDocument();
      expect(screen.getByText('$12.99')).toBeInTheDocument();
    });
  });

  it('should render the search bar', () => {
    render(<BooksContainer advertisement={true} />);

    const searchBarElement = screen.getByPlaceholderText('Search');
    expect(searchBarElement).toBeInTheDocument();
  });

  it('should render a message when no books are found', async () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    const books: BookType[] = [];

    mockFetch(books);

    render(<BooksContainer advertisement={false} />);

    await waitFor(() => {
      (useSession as jest.Mock).mockReturnValue(mockSession);

      expect(screen.queryByText('No books found')).toBeInTheDocument();
    });
  });



  it('should render a message when no books are found', async () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    const books: BookType[] = [
      { idbook: 1, name: 'Book 1', price: 10.99, img_src: 'book1.jpg', description: 'Lorem ipsum' },
    ];

    const booksSearch: BookType[] = [
      { idbook: 2, name: 'Book 2', price: 12.99, img_src: 'book2.jpg', description: 'Dolor sit amet' },
    ];

    mockFetch(books);

    render(<BooksContainer advertisement={false} />);

    await waitFor(() => {
      (useSession as jest.Mock).mockReturnValue(mockSession);

      expect(screen.getByText('Book 1')).toBeInTheDocument();
    });

    const searchValue = 'Book 2';

    mockFetch(booksSearch);

    const searchBarElement = screen.getByPlaceholderText('Search');
    const searchButtonElement = screen.getByRole('button', { name: 'Search' });

    searchBarElement.focus();
    fireEvent.change(searchBarElement, { target: { value: searchValue } });
    fireEvent.click(searchButtonElement);

    await waitFor(() => {
      (useSession as jest.Mock).mockReturnValue(mockSession);

      expect(screen.getByText('Book 2')).toBeInTheDocument();
    });
  });

  it('should render books when books are fetched and advertisement is true', async () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    const books = [
      { idbook: 1, name: 'Book 1', price: 10.99, img_src: 'book1.jpg', description: 'Lorem ipsum' },
      { idbook: 2, name: 'Book 2', price: 12.99, img_src: 'book2.jpg', description: 'Dolor sit amet' },
    ];

    mockFetch(books);

    render(<BooksContainer advertisement={true} />);

    await waitFor(() => {
      (useSession as jest.Mock).mockReturnValue(mockSession);

      expect(screen.queryByText('No books found')).not.toBeInTheDocument();
      expect(screen.getByText('Book 1')).toBeInTheDocument();
      expect(screen.getByText('$10.99')).toBeInTheDocument();

      expect(screen.getByText('Book 2')).toBeInTheDocument();
      expect(screen.getByText('$12.99')).toBeInTheDocument();
    });
  });
});
