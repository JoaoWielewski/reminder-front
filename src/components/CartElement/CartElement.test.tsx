import { fireEvent, render, screen } from '@testing-library/react';
import { CartContext } from '../CartContext/CartContext';
import CartElement from './CartElement';
import book from './mock';

describe('<CartElement />', () => {

    it('should render CartElement correctly', () => {
      render(<CartElement {...book} ></CartElement>);

      expect(screen.getByRole('heading', { name: 'Test Book' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: '$20' })).toBeInTheDocument();
    });

    it('should remove CartElement from CartContext', () => {
      const mockRemoveFromCart = jest.fn();

      render(
        <CartContext.Provider value={{ removeFromCart: mockRemoveFromCart, items: [], addToCart: () => {}, removeAllFromCart: () => {}, }}>
          <CartElement {...book} />
        </CartContext.Provider>
      );

      const removeButton = screen.getByRole('button', { name: 'Remove' });
      fireEvent.click(removeButton);

      expect(screen.getByText('Sure?')).toBeInTheDocument();

      const yesButton = screen.getByRole('button', { name: 'Yes' });
      fireEvent.click(yesButton);

      expect(mockRemoveFromCart).toHaveBeenCalledWith(book.idbook);
    });

});