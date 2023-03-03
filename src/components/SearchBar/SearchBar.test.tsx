import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {

  it('should render SearchBar with advertisement false', () => {
    const onChangeFunction = jest.fn();
    const onClickFunction = jest.fn();
    const disabled = false;
    const advertisement = false;
    render(<SearchBar disabled={disabled} onChangeFunction={onChangeFunction} onClickFunction={onClickFunction} advertisement={advertisement}></SearchBar>);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(document.querySelector('.advertisement-search-div')).not.toBeInTheDocument();
  });

  it('should render SearchBar with advertisement true', () => {
    const onChangeFunction = jest.fn();
    const onClickFunction = jest.fn();
    const disabled = false;
    const advertisement = true;
    render(<SearchBar disabled={disabled} onChangeFunction={onChangeFunction} onClickFunction={onClickFunction} advertisement={advertisement}></SearchBar>);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(document.querySelector('.advertisement-search-div')).toBeInTheDocument();
  });

  it('should call onChangeFunction on input change', () => {
    const onChangeFunction = jest.fn();
    const onClickFunction = jest.fn();
    const disabled = false;
    const advertisement = false;
    render(<SearchBar disabled={disabled} onChangeFunction={onChangeFunction} onClickFunction={onClickFunction} advertisement={advertisement}></SearchBar>);

    const inputElement = screen.getByPlaceholderText('Search');
    const inputValue = 'input test';
    fireEvent.change(inputElement, { target: { value: inputValue } });

    expect(onChangeFunction).toHaveBeenCalledTimes(1);
    expect(onChangeFunction).toHaveBeenCalledWith(inputValue);
  });

  it('should call onClickFunction on button click', () => {
    const onChangeFunction = jest.fn();
    const onClickFunction = jest.fn();
    const disabled = false;
    const advertisement = false;
    render(<SearchBar disabled={disabled} onChangeFunction={onChangeFunction} onClickFunction={onClickFunction} advertisement={advertisement}></SearchBar>);

    const button = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(button);

    expect(onClickFunction).toHaveBeenCalledTimes(1);
  });

  it('should disable button when disabled prop is true', () => {
    const onChangeFunction = jest.fn();
    const onClickFunction = jest.fn();
    const disabled = true;
    const advertisement = false;
    render(<SearchBar disabled={disabled} onChangeFunction={onChangeFunction} onClickFunction={onClickFunction} advertisement={advertisement}></SearchBar>);

    const button = screen.getByRole('button', { name: 'Search' });

    expect(button).toBeDisabled();
  });

});