import React from 'react';

import AuthAPI from './apis/AuthAPI';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';

function App() {
  const auth = new AuthAPI();

  return (
    <AuthProvider>
      <Login api={auth} />
    </AuthProvider>
  );
}

export default App;
