import React, { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from './useAuth';

type WrapperProps = { children: ReactNode };

function wrapper({ children }: WrapperProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

describe('useAuth', () => {
  const response = { token: '1234' };
  const error = new Error('Could not log in');

  it('handles login success', async () => {
    const api = {
      login: () => { return Promise.resolve(response); },
    };
    const { result, waitForNextUpdate } = renderHook(() => { return useAuth(api); }, { wrapper });
    result.current.login();
    await waitForNextUpdate();
    expect(result.current.authenticated).toEqual(true);
    expect(result.current.error).toEqual(undefined);
  });

  it('handles login error', async () => {
    const api = {
      login: () => { return Promise.reject(error); },
    };
    const { result, waitForNextUpdate } = renderHook(() => { return useAuth(api); }, { wrapper });
    result.current.login();
    await waitForNextUpdate();
    expect(result.current.authenticated).toEqual(false);
    expect(result.current.error).toEqual(error);
  });

  it('handles logout', async () => {
    const api = {
      login: () => { return Promise.resolve(response); },
    };
    const { result, waitForNextUpdate } = renderHook(() => { return useAuth(api); }, { wrapper });

    result.current.login();
    await waitForNextUpdate();
    expect(result.current.authenticated).toEqual(true);

    act(() => {
      result.current.logout();
    });
    expect(result.current.authenticated).toEqual(false);
  });
});
