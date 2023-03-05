import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';
import { signIn, signOut, useSession } from 'next-auth/react';

jest.mock("next-auth/react");

describe('<Header />', () => {

  it('should render Header with Log In when the user is not authenticated', () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    render(<Header></Header>);

    expect(screen.getByText('BookStore')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('should render Header with Log Out when the user is authenticated', () => {
    const mockSession = {
      data: {
        user: {
          email: "test@gmail.com",
        },
      },
      status: "authenticated",
    };
    (useSession as jest.Mock).mockReturnValueOnce(mockSession);
    const { container } = render(<Header></Header>);
    expect(screen.getByText('BookStore')).toBeInTheDocument();
    expect(document.querySelector('.login-link')).not.toBeInTheDocument();
    expect(document.querySelector('.logout-link')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should call signIn when Log In is clicked', () => {
    const signInMock = jest.fn();
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);
    (signIn as jest.Mock).mockImplementation(signInMock);

    render(<Header></Header>);

    fireEvent.click(screen.getByText('Log In'));
    expect(signInMock).toHaveBeenCalled();
  });

});