import React from 'react';

import AuthAPI from './apis/AuthAPI';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';

const App: React.FC = () => {
  const auth = new AuthAPI();

  return (
    <AuthProvider>
      <Login api={auth} />
    </AuthProvider>
  );
};

export default App;
