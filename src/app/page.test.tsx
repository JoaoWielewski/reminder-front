import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './page';
import { useSession } from 'next-auth/react';

jest.mock("next-auth/react");

describe('Home', () => {

  it('should renders the correct heading', () => {
    const mockSession = {
      data: {},
      status: "unauthenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    render(<Home />);
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});