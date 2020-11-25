import React, {ReactNode} from 'react';
import {act, renderHook} from '@testing-library/react-hooks';

import {AuthProvider, useAuth} from './AuthContext';

type WrapperProps = { children: ReactNode };

function wrapper({ children }: WrapperProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

describe('AuthContext', () => {
  it('handles login success', () => {
    const token = '1234';
    const {result} = renderHook(() => useAuth(), {wrapper});
    act(() => {
      result.current.dispatch({type: 'login.success', token});
    });
    expect(result.current.state.token).toEqual(token);
    expect(result.current.state.error).toEqual(undefined);
  });

  it('handles login error', () => {
    const error = 'Authentication failed';
    const {result} = renderHook(() => useAuth(), {wrapper});
    act(() => {
      result.current.dispatch({type: 'login.error', error});
    });
    expect(result.current.state.token).toEqual(undefined);
    expect(result.current.state.error).toEqual(error);
  });
});
