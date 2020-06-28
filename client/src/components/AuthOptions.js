import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from './Context/UserContext';

const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const login = () => history.push('/login');
  const register = () => history.push('/register');
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };
  return (
    <div className="auth-buttons">
      {userData.user ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <>
          <button onClick={login}>Login</button>
          <button onClick={register}>Register</button>
        </>
      )}
    </div>
  );
};

export default AuthOptions;
