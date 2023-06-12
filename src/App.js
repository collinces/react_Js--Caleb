import "./index.css";
import { useState } from "react";
import Header from "./components/Header";

import Employees from "./pages/Employees";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Customers from "./pages/Customers";

import Dictionary from "./pages/Dictionary";

import Definition from "./pages/Definition";

import NotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/employees" element={<Employees />} />
            <Route path="/Customers" element={<Customers />} />
            <Route path="/Dictionary" element={<Dictionary />} />

            <Route path="/Dictionary/:search" element={<Definition />} />

            <Route path="/404" element={<NotFound />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </div>
  );
}

export default App;
