import React from 'react';

const Login = () => {
  return (
    <section className="py-4">
      <div className="text-center">
        <h1>Login</h1>
        <hr className="mx-auto w-25" />
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-9 col-md-6 col-lg-6 mx-auto">
            <form>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <button type="submit" class="btn btn-outline-success">
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
