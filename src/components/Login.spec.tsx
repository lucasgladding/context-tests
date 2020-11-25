import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AuthProvider } from '../contexts/AuthContext';
import Login from './Login';

describe('Login', () => {
  const data = {
    username: 'admin',
    password: 'password',
  };

  it('handles login', async () => {
    const api = {
      login: jest.fn(() => Promise.resolve({ token: '1234' })),
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

  it('handles login error', async () => {
    const error = new Error('Authentication error');
    const api = {
      login: jest.fn(() => Promise.reject(error)),
    };
    render(
      <AuthProvider>
        <Login api={api} />
      </AuthProvider>,
    );
    userEvent.type(await screen.findByLabelText('Username'), data.username);
    userEvent.type(await screen.findByLabelText('Password'), data.password);
    userEvent.click(await screen.findByText('Submit'));
    expect(await screen.findByText(error.message)).toBeDefined();
  });
});
