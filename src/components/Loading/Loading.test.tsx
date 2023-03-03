import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('<Loading />', () => {

  it('should render Loading', () => {
    render(<Loading></Loading>);
    expect(document.querySelector('.loading')).toBeInTheDocument();
  });

});