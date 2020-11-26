import AuthAPI from '../apis/AuthAPI';
import { useAuthContext } from '../contexts/AuthContext';

// eslint-disable-next-line import/prefer-default-export
export function useAuth(api: AuthAPI) {
  const { state, dispatch } = useAuthContext();

  const { token, error } = state;

  async function login() {
    try {
      const response = await api.login();
      dispatch({ type: 'login.success', token: response.token });
    } catch (err) {
      dispatch({ type: 'login.error', error: err });
    }
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  const authenticated = token !== undefined;

  return {
    login, logout, authenticated, error,
  };
}
