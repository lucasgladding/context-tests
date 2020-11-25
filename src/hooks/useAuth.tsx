import AuthAPI from '../apis/AuthAPI';
import {useAuthDispatchContext, useAuthStateContext} from '../contexts/AuthContext';

export function useAuth(api: AuthAPI) {
  const state = useAuthStateContext();
  const dispatch = useAuthDispatchContext();

  async function login() {
    try {
      const response = await api.login();
      dispatch({type: 'login.success', token: response.token})
    } catch (error) {
      dispatch({type: 'login.error', error: error})
    }
  }

  function logout() {
    dispatch({type: 'logout'});
  }

  const {token, error} = state;

  const authenticated = token !== undefined;

  return {login, logout, authenticated, error};
}
