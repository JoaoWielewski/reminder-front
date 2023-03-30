import { screen, render } from '@testing-library/react';
import AuthContext from './AuthContext';

describe('AuthContext', () => {
  it('should render AuthContext with children', () => {
    render(
      <AuthContext>
        <div>test</div>
      </AuthContext>
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});