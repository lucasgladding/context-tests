import React, {ReactNode} from 'react';
import {renderHook} from '@testing-library/react-hooks';

import {AuthProvider} from '../contexts/AuthContext';
import {useAuth} from './useAuth';

type WrapperProps = { children: ReactNode };

function wrapper({ children }: WrapperProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

describe('useAuth', () => {
  const response = {token: '1234'};

  it('handles login success', async () => {
    const api = {
      login: () => Promise.resolve(response),
    };
    const {result, waitForNextUpdate} = renderHook(() => useAuth(api), {wrapper});
    await result.current.login();
    await waitForNextUpdate();
    expect(result.current.authenticated).toEqual(true);
  });

  it('handles login error', async () => {
    const api = {
      login: () => Promise.reject(),
    };
    const {result, waitForNextUpdate} = renderHook(() => useAuth(api), {wrapper});
    await result.current.login();
    await waitForNextUpdate();
    expect(result.current.authenticated).toEqual(false);
  });
});
