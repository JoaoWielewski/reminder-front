import { fireEvent, render, screen } from '@testing-library/react';
import PopUp from './PopUp';

describe('<PopUp />', () => {

  it('should render PopUp when trigger is true', () => {
    const setTrigger = jest.fn();
    render(<PopUp title={'title'} content={'content'} trigger={true} setTrigger={setTrigger}></PopUp>);
    expect(screen.getByRole('heading', { name: 'title' })).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
    const closeButton = screen.getByRole('button', { name: 'Close' });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(setTrigger).toHaveBeenCalledWith(false);

  });

  it('should not render PopUp when trigger is false', () => {
    const setTrigger = jest.fn();
    render(<PopUp title={'title'} content={'content'} trigger={false} setTrigger={setTrigger}></PopUp>);
    expect(screen.queryByRole('heading', { name: 'title' })).not.toBeInTheDocument();
    expect(screen.queryByText('content')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });
});