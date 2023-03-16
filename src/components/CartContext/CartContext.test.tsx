import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import CartProvider, { CartContext } from './CartContext';

describe('<CartProvider />', () => {

    it('should add an item to the cart', () => {
      render(
        <CartProvider>
          <ChildComponent />
        </CartProvider>
      );

      const addToCartButton = screen.getByTestId('add-to-cart-button');
      fireEvent.click(addToCartButton);

      const cartItems = screen.getAllByTestId('cart-item');
      expect(cartItems).toHaveLength(1);
    });

    it('should remove an item from the cart', () => {
      render(
        <CartProvider>
          <ChildComponent />
        </CartProvider>
      );

      const addToCartButton = screen.getByTestId('add-to-cart-button');
      fireEvent.click(addToCartButton);

      const removeFromCartButton = screen.getByTestId('remove-from-cart-button');
      fireEvent.click(removeFromCartButton);

      const cartItems = screen.queryAllByTestId('cart-item');
      expect(cartItems).toHaveLength(0);
    });

    it('should remove all items from the cart', () => {
      render(
        <CartProvider>
          <ChildComponent />
        </CartProvider>
      );

      const addToCartButton = screen.getByTestId('add-to-cart-button');
      fireEvent.click(addToCartButton);

      const removeAllFromCartButton = screen.getByTestId('remove-all-from-cart-button');
      fireEvent.click(removeAllFromCartButton);

      const cartItems = screen.queryAllByTestId('cart-item');
      expect(cartItems).toHaveLength(0);
    });

});

function ChildComponent() {
  const { addToCart, removeFromCart, removeAllFromCart, items } = useContext(CartContext);

  return (
    <div>
      <button onClick={() => addToCart(1, 'Book 1', 10, 'book1.jpg', 'Book 1 description')} data-testid="add-to-cart-button">
        Add to Cart
      </button>
      {items.map(item => (
        <div key={item.idbook} data-testid="cart-item">
          {item.name} - {item.price}$
          <button onClick={() => removeFromCart(item.idbook)} data-testid="remove-from-cart-button">
            Remove
          </button>
        </div>
      ))}
      <button onClick={() => removeAllFromCart()} data-testid="remove-all-from-cart-button">
        Remove All
      </button>
    </div>
  );
}