import { fireEvent, render, screen } from '@testing-library/react';
import ConfirmationPopUp from './ConfirmationPopUp';

describe('<ConfirmationPopUp />', () => {

  it('should render PopUp when trigger is true and set it to false by pressing the button "yes"', () => {
    const setTrigger = jest.fn();
    const onDialog = jest.fn();
    render(<ConfirmationPopUp title={'title'} content={'content'} trigger={true} setTrigger={setTrigger} onDialog={onDialog}></ConfirmationPopUp>);
    expect(screen.getByRole('heading', { name: 'title' })).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
    const closeButton = screen.getByRole('button', { name: 'Yes' });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(setTrigger).toHaveBeenCalledWith(false);
  });

  it('should render PopUp when trigger is true and set it to false by pressing the button "no"', () => {
    const setTrigger = jest.fn();
    const onDialog = jest.fn();
    render(<ConfirmationPopUp title={'title'} content={'content'} trigger={true} setTrigger={setTrigger} onDialog={onDialog}></ConfirmationPopUp>);
    expect(screen.getByRole('heading', { name: 'title' })).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
    const closeButton = screen.getByRole('button', { name: 'No' });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(setTrigger).toHaveBeenCalledWith(false);
  });

  it('should not render PopUp when trigger is false', () => {
    const setTrigger = jest.fn();
    const onDialog = jest.fn();
    render(<ConfirmationPopUp title={'title'} content={'content'} trigger={false} setTrigger={setTrigger} onDialog={onDialog}></ConfirmationPopUp>);
    expect(screen.queryByRole('heading', { name: 'title' })).not.toBeInTheDocument();
    expect(screen.queryByText('content')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Yes' })).not.toBeInTheDocument();
  });
});