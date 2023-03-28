import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import BooksContainer from './BooksContainer';
import books from './mock';

jest.mock("next-auth/react");

describe('BooksContainer component', () => {

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(books)
    })
  );


  it('should render a loading indicator when loading is true', () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    render(<BooksContainer advertisement={false} />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
  });


  it('should render books when loading is false', async () => {

    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(books),
    }) as jest.Mock;

    render(<BooksContainer advertisement={false} />);

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();

    fetchMock.mockRestore();
  });
});