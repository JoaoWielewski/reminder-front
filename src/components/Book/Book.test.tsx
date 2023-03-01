import { render } from '@testing-library/react';
import Book from './Book';

describe('<Book />', () => {

  const book = {
    idbook: 1,
    name: 'Test Book',
    price: 20,
    img_src: 'test-book.jpg',
    description: 'This is a test book'
  };

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