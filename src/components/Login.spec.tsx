import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AuthProvider } from '../contexts/AuthContext';
import Login from './Login';

describe('Login', () => {
  it('handles login', async () => {
    const api = {
      login: jest.fn(() => Promise.resolve({ token: '1234' })),
    };
    const data = {
      username: 'admin',
      password: 'password',
    };

    render(
      <AuthProvider>
        <Login api={api} />
      </AuthProvider>,
    );
    userEvent.type(await screen.findByLabelText('Username'), data.username);
    userEvent.type(await screen.findByLabelText('Password'), data.password);
    userEvent.click(await screen.findByText('Submit'));
    expect(await screen.findByText('Authenticated')).toBeDefined();
  });
});
