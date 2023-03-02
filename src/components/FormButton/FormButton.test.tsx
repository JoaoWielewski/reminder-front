import { render, screen } from '@testing-library/react';
import FormButton from './FormButton';

describe('<FormButton />', () => {

  it('should render FormButton', () => {
    render(<FormButton title={'title'}></FormButton>);
    expect(screen.getByRole('button', { name: 'title' })).toBeInTheDocument();
  });

});