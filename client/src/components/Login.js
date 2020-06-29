import React, { useState, useContext } from 'react';
import UserContext from './Context/UserContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorHandler from './ErrorHandler';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };

      const loginResponse = await axios.post(
        'http://localhost:5000/users/login',
        loginUser
      );

      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem('auth-token', loginResponse.data.token);
      history.push('/');
    } catch (error) {
      // if there is an error, setErrors hook sets the error
      error.response.data.msg && setErrors(error.response.data.msg);
    }
  };

  return (
    <section className="py-4">
      <div className="text-center">
        <h1>Login</h1>
        <hr className="mx-auto w-25" />
        {errors && (
          <ErrorHandler
            message={errors}
            clearError={() => setErrors(undefined)}
          />
        )}
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-9 col-md-6 col-lg-6 mx-auto">
            <form onSubmit={submitForm}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-outline-success">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
