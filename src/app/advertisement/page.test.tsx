import React from 'react';
import { render, screen } from '@testing-library/react';
import Advertisement from './page';
import { useSession } from 'next-auth/react';

jest.mock("next-auth/react");

describe('Advertisement', () => {

  it('should renders the correct heading', () => {
    const mockSession = {
      data: {},
      status: "authenticated",
    };

    (useSession as jest.Mock).mockReturnValueOnce(mockSession);

    render(<Advertisement />);
    expect(screen.getByText('Your books')).toBeInTheDocument();
  });
});