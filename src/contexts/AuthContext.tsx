import React, {createContext, ReactNode, useContext, useReducer} from 'react';

// State

interface AuthState {
  token?: string;
  error?: string;
}

const AuthStateContext = createContext<AuthState | undefined>(undefined);

// Dispatch

type AuthAction =
  { type: 'login.success'; token: string; } |
  { type: 'login.error'; error: string; }
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
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reduce, {});

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used inside a provider');
  }
  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used inside a provider');
  }
  return context;
}

export function useAuth() {
  return {state: useAuthState(), dispatch: useAuthDispatch()};
}
