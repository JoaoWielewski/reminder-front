import { render } from '@testing-library/react';
import FormLoading from './FormLoading';

describe('<Loading />', () => {

  it('should render Loading', () => {
    render(<FormLoading></FormLoading>);
    expect(document.querySelector('.form-loading')).toBeInTheDocument();
  });

});