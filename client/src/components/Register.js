import React, { useState, useContext } from 'react';
import UserContext from './Context/UserContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorHandler from './ErrorHandler';

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const newUser = { displayName, email, password, confirm_password };

      await axios.post('http://localhost:5000/users/register', newUser);
      const loginResponse = await axios.post(
        'http://localhost:5000/users/login',
        {
          email,
          password,
        }
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
        <h1>Register</h1>
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
                <label htmlFor="exampleText" className="form-label">
                  Display Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleText"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="emailHelp"
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
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-outline-success">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
