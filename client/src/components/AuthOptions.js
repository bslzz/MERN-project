import React from 'react';
import { useHistory } from 'react-router-dom';

const AuthOptions = () => {
  const history = useHistory();
  const login = () => history.push('/login');
  const register = () => history.push('/register');
  return (
    <div className="auth-buttons">
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
    </div>
  );
};

export default AuthOptions;
