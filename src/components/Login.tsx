import React, { useState } from 'react';

import AuthAPI from '../apis/AuthAPI';
import { useAuth } from '../hooks/useAuth';

interface LoginProps {
  api: AuthAPI;
}

function Login({ api }: LoginProps) {
  const { login, authenticated, error } = useAuth(api);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function onLogin() {
    login();
  }

  if (authenticated) {
    return (
      <div>Authenticated</div>
    );
  }

  if (error) {
    return (
      <div>{error.message}</div>
    );
  }

  return (
    <div>
      <input value={username} onChange={(event) => { setUsername(event.target.value); }} aria-label="Username" />
      <input value={password} onChange={(event) => { setPassword(event.target.value); }} aria-label="Password" type="password" />
      <button onClick={onLogin} type="button">Submit</button>
    </div>
  );
}

export default Login;
