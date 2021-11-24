import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./login.css";
import axiosClient from "./../../../api/axiosClient";

function LoginPage(props) {
  const [state, setstate] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(localStorage.getItem("jwt") != null);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setstate({
      ...state,
      [name]: value,
    });
  };

  const login = () => {
    axiosClient
      .post("/auth/signin", state)
      .then((response) => {
        console.log("token ", response.data);
        localStorage.setItem("access_token", response.data.data.accessToken);
        setIsLogin(true);
      })
      .catch((error) => {
        alert("Error Username , password are wrong!");
        console.log("error", error);
      });
  };
  return (
    <div class="container h-100">
      <div class="d-flex justify-content-center h-100">
        <div class="user_card">
          <div class="d-flex justify-content-center">
            <div class="brand_logo_container">
              <img
                src="https://i2-prod.mirror.co.uk/incoming/article22595901.ece/ALTERNATES/s615b/0_FBL-EUR-C1-BARCELONA-NAPOLI.jpg"
                class="brand_logo"
                alt="Logo"
              />
            </div>
          </div>
          <div class="d-flex justify-content-center form_container">
            <form>
              <div class="input-group mb-3">
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
                <input
                  class="form-control input_user"
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div class="input-group mb-2">
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fas fa-key"></i>
                  </span>
                </div>
                <input
                  class="form-control input_pass"
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div class="form-group">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customControlInline"
                  />
                  <label class="custom-control-label" for="customControlInline">
                    Remember me
                  </label>
                </div>
              </div>
              <div class="d-flex justify-content-center mt-3 login_container">
                <Link to="/">
                  <button
                    type="button"
                    name="button"
                    class="btn login_btn"
                    onClick={() => login()}
                  >
                    Login
                  </button>
                </Link>
              </div>
            </form>
          </div>

          <div class="mt-4">
            <div class="d-flex justify-content-center links">
              Don't have an account?{" "}
              <a href="/user/register" class="ml-2">
                Sign Up
              </a>
            </div>
            <div class="d-flex justify-content-center links">
              <a href="/#">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
