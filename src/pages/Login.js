import React from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { basedUrl } from "../Shared";
import { loginContext } from "../App";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();
  const location = useLocation(); // contains state object of navigate. helps to navigate to previous page specify in state object
  const [loggedIn, setLoggedIn] = useContext(loginContext);

  const url = basedUrl + "api/token/";

  function login(e) {
    e.preventDefault(); // prevent the page to refresh

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("request did not go through");
        }
        return response.json();
      })
      .then((data) => {
        // data contains the response json data
        localStorage.setItem("access", data.access); // getting the access token
        localStorage.setItem("refresh", data.refresh);
        setLoggedIn(true);
        //console.log(localStorage);
        navigate(
          location?.state?.previousUrl
            ? location.state.previousUrl
            : "/Customer"
        ); // when loggin navigate to previous page user attempted logged in prior or default go to /Customer page
        setError(undefined);
      })
      .catch(() => {
        console.log(e);
        setError(e.message);
      });
  }

  return (
    <div>
      <form className="w-full max-w-sm" id="login" onSubmit={login}>
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/4">
            <label for="username">Username</label>
          </div>

          <div className="md:w-3/5">
            <input // input box for customer.name
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={username} // save input value into username
              onChange={(e) => {
                setUsername(e.target.value); // pass value entered to username by using its setUsername
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/4">
            <label for="password">Password</label>
          </div>

          <div className="md:w-3/5">
            <input // input box for customer.insdustry
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value); // pass value entered to password by using its setPassword
              }}
            />
          </div>
        </div>

        <button
          className=" bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          onClick={login}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
