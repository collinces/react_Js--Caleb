import "./index.css";
import Header from "./components/Header";

import Employees from "./pages/Employees";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Customers from "./pages/Customers";

import Dictionary from "./pages/Dictionary";

import Definition from "./pages/Definition";

import NotFound from "./components/NotFound";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import { basedUrl } from "./Shared";
import Register from "./pages/Register";

export const loginContext = createContext(); // export allows us to import this variable in other files

function App() {
  const url = basedUrl + "api/token/refresh/";
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false); // this state variable is accessible by all components

  // this useEffect helps us get new access/refresh tokens in the time interval indicated
  useEffect(() => {
    // refreshToken function allow us to get new tokens
    function refreshToken() {
      if (localStorage.refresh) {
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ refresh: localStorage.refresh }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.access = data.access;
            localStorage.refresh = data.refresh;
            setLoggedIn(true);
          });
      }
    }

    //refreshToken function is invoke immediately instead of waiting 3 minutes as indicated below
    refreshToken();
    const minute = 1000 * 60;
    setInterval(refreshToken, minute * 3); // wait time is 3 mitutes to get new access/refresh tokens
  }, []);

  // changeLoggedIn verifies if we are logged in or not
  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear(); // deteleting the access/refresh token because we are logged out
    }
  }

  return (
    <loginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            {/* render element Employees at this route*/}
            <Route path="/employees" element={<Employees />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/dictionary/:search" element={<Definition />} />
            <Route path="/404" element={<NotFound />} />
            {/* the * means throw the not found error for any page not existing */}
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </loginContext.Provider>
  );
}

export default App;
