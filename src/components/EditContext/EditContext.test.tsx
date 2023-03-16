import BookType from '@/types/types';
import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import EditProvider, { EditContext, EditContextType } from './EditContext';

describe('<EditProvider />', () => {

    it('should add an item to the context', () => {
      render(
        <EditProvider>
          <TestComponent />
        </EditProvider>
      );

      const addToItemButton = screen.getByTestId('add-to-item-button');
      fireEvent.click(addToItemButton);

      const item = screen.getByTestId('item');
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent('Book 1 - 10$');
    });

    it('should clear the item from the context', () => {

      render(
        <EditProvider>
          <TestComponent />
        </EditProvider>
      );

      const addToItemButton = screen.getByTestId('add-to-item-button');
      fireEvent.click(addToItemButton);

      const item = screen.getByTestId('item');
      expect(item).toBeInTheDocument();

      const clearItemButton = screen.getByTestId('clear-item-button');
      fireEvent.click(clearItemButton);

      const newItem = screen.queryByTestId('item');
      expect(newItem).not.toBeInTheDocument();
    });

});

const mockBook: BookType = {
  idbook: 1,
  name: 'Book 1',
  price: 10,
  img_src: 'book1.jpg',
  description: 'Book 1 description',
};

const TestComponent = () => {
  const { item, addToItem, clearItem } = useContext<EditContextType>(EditContext);

  return (
    <div>
      <button onClick={() => addToItem(mockBook)} data-testid="add-to-item-button">
        Add to Item
      </button>
      {item && (
        <div>
          <div data-testid="item">
            {item.name} - {item.price}$
          </div>
          <button onClick={() => clearItem()} data-testid="clear-item-button">
            Clear Item
          </button>
        </div>
      )}
    </div>
  );
};