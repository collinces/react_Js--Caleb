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
import { createContext, useState } from "react";

export const loginContext = createContext(); // export allows us to import this variable in other files

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <loginContext.Provider value={[loggedIn, setLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/employees" element={<Employees />} />
            <Route path="/Customers" element={<Customers />} />
            <Route path="/Customers/:id" element={<Customer />} />
            <Route path="/Dictionary" element={<Dictionary />} />

            <Route path="/Dictionary/:search" element={<Definition />} />

            <Route path="/404" element={<NotFound />} />

            {/* the * means throw the not found error for any page not existing */}
            <Route path="*" element={<NotFound />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </loginContext.Provider>
  );
}

export default App;
