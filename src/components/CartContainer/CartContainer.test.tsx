import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CartContainer from './CartContainer';
import CartProvider, { CartContext } from '../CartContext/CartContext';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

jest.mock("next-auth/react");

describe('<CartContainer />', () => {

  it('renders a list of books and a pay button', async () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    render(
      <CartProvider>
        <ChildComponent></ChildComponent>
        <CartContainer />
      </CartProvider>
    );

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    const addToCartButton = screen.getByTestId('add-to-cart-button');
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Pay' })).toBeInTheDocument();

      expect(screen.getByText('Book 1')).toBeInTheDocument();
      expect(screen.getByText('$10')).toBeInTheDocument();
      expect(screen.getByText('Total: $10')).toBeInTheDocument();
    });
  });

  it('renders a list of books and a pay button', async () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    render(
      <CartProvider>
        <CartContainer />
      </CartProvider>
    );

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });


  it('should render the confirmation pop up when the pay button is clicked', async () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    render(
      <CartProvider>
        <ChildComponent></ChildComponent>
        <CartContainer />
      </CartProvider>
    );

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    const addToCartButton = screen.getByTestId('add-to-cart-button');
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Pay' })).toBeInTheDocument();
    });

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    fireEvent.click(screen.getByRole('button', { name: 'Pay' }));

    expect(
      screen.getByText('Are you sure you want to pay now?')
    ).toBeInTheDocument();
  });

  it('renders a list of books and a pay button', async () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    render(
      <CartProvider>
        <ChildComponent></ChildComponent>
        <CartContainer />
      </CartProvider>
    );

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    const addToCartButton = screen.getByTestId('add-to-cart-button');
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Pay' })).toBeInTheDocument();

      expect(screen.getByText('Book 1')).toBeInTheDocument();
      expect(screen.getByText('$10')).toBeInTheDocument();
      expect(screen.getByText('Total: $10')).toBeInTheDocument();
    });
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