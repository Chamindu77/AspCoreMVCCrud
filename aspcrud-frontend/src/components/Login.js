// Login.js

import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const response = await axios.post(`https://localhost:44311/api/Users/login`, data);

      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken); // Store token in local storage
        navigateTo("/studentcrud");
        window.alert("Login Successful!");
      } else {
        console.log('Login failed:', response.data.message);
        alert("Invalid Credentials!");
      }
    } catch (error) {
      console.log('Error:', error);
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center py-5 ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card border-success" style={{ width: '400px', height: '400px', borderWidth: '3px' }}>
              <div className="card-header text-center font-weight-bold h2">Log in</div>
              <div className="card-body d-flex flex-column justify-content-center">
                <form onSubmit={submitLogin} className="space-y-6" action="#" method="POST">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value) }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100 mt-5">Log in</button>
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <Link to="/signup" className="text-success">Don't have an account? Sign Up</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
