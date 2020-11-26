import React, {
  createContext, ReactNode, useContext, useReducer,
} from 'react';

// Interfaces and types

interface IAuthState {
  token?: string;
  error?: Error;
}

type IAuthAction =
  { type: 'login.success'; token: string; } |
  { type: 'login.error'; error: Error; } |
  { type: 'logout'; }
  ;

interface IAuthContext {
  state: IAuthState;
  dispatch: (action: IAuthAction) => void;
}

// Context and hooks

type IAuthProvider = { children: ReactNode; };

function reduce(state: IAuthState, action: IAuthAction): IAuthState {
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
    default:
      return state;
  }
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: IAuthProvider) {
  const initialState = { token: undefined, error: undefined };
  const [state, dispatch] = useReducer(reduce, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used inside an AuthProvider');
  }
  return context;
}
