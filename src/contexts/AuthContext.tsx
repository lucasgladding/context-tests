import React, {createContext, ReactNode, useContext, useReducer} from 'react';

// State

interface AuthState {
  token?: string;
  error?: Error;
}

const AuthStateContext = createContext<AuthState | undefined>(undefined);

// Dispatch

type AuthAction =
  { type: 'login.success'; token: string; } |
  { type: 'login.error'; error: Error; } |
  { type: 'logout'; }
  ;

type AuthDispatch = (action: AuthAction) => void;

const AuthDispatchContext = createContext<AuthDispatch | undefined>(undefined);

// Context and hooks

type AuthProviderProps = {children: ReactNode};

function reduce(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'login.success':
      return {
        token: action.token,
        error: undefined,
      };
    case 'login.error':
      return {
        token: undefined,
        error: action.error,
      };
    case 'logout':
      return {
        token: undefined,
        error: undefined,
      };
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const initialState = {token: undefined, error: undefined};
  const [state, dispatch] = useReducer(reduce, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuthStateContext() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used inside an AuthProvider');
  }
  return context;
}

export function useAuthDispatchContext() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used inside an AuthProvider');
  }
  return context;
}

export function useAuthContext() {
  return {state: useAuthStateContext(), dispatch: useAuthDispatchContext()};
}
