import { render, screen } from '@testing-library/react';
import FormContainer from './FormContainer';

describe('<FormContainer />', () => {

  it('should render FormContainer', () => {
    render(
      <FormContainer title={'Title'}>
        <div data-testid="test-child">Test Child</div>
      </FormContainer>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toHaveTextContent('Test Child');
  });

});