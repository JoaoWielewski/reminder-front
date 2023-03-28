import { act, render, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import BooksContainer from './BooksContainer';
// import books from './mock';

jest.mock("next-auth/react");

const mockFetch = (response: any) => {
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
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

  //it('should render a loading indicator when loading is true', async () => {
  //  const mockSession = {
  //    data: {},
  //    status: "unauthenticated",
  //  };
//
  //  (useSession as jest.Mock).mockReturnValueOnce(mockSession);
//
  //  render(<BooksContainer advertisement={false} />);
  //  expect(document.querySelector('.loading')).toBeInTheDocument();
  //});


  it('should render books when loading is false', async () => {
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

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(screen.queryByText('No books found')).not.toBeInTheDocument();
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('$10.99')).toBeInTheDocument();
    expect(screen.getByAltText('Book 1')).toBeInTheDocument();

    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    expect(screen.getByAltText('Book 2')).toBeInTheDocument();
  });
});



 //const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    //  json: jest.fn().mockResolvedValueOnce(books),
    //}) as jest.Mock;



//    it('should render books when loading is false', async () => {
//      const mockSession = {
//        data: {},
//        status: "unauthenticated",
//      };
//
//      (useSession as jest.Mock).mockReturnValueOnce(mockSession);
//
//      global.fetch = jest.fn().mockImplementation(() =>
//      Promise.resolve({
//        json: () => Promise.resolve(books),
//      })
//    );
//
//      render(<BooksContainer advertisement={false} />);
//
//      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
//
//      expect(screen.getByText('Book 1')).toBeInTheDocument();
//      expect(screen.getByText('$10')).toBeInTheDocument();
//      expect(screen.getByText('Book 2')).toBeInTheDocument();
//      expect(screen.getByText('$20')).toBeInTheDocument();
//    });