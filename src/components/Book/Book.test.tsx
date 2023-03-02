import { render } from '@testing-library/react';
import Book from './Book';
import book from './mock';

describe('<Book />', () => {

  it('should render book', () => {
    const { getByRole } = render(<Book {...book} />);

    const bookImage = getByRole('img');
    expect(bookImage).toBeInTheDocument();
    expect(bookImage).toHaveAttribute('src', 'test-book.jpg');
    expect(bookImage).toHaveAttribute('alt', '');

    const bookName = getByRole('heading', { name: 'Test Book' });
    expect(bookName).toBeInTheDocument();

    const bookPrice = getByRole('heading', { name: '$20' });
    expect(bookPrice).toBeInTheDocument();
  });
});