import React from "react";
import { StrictMode } from "react";
import ReactDom from "react-dom";
import "./App.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowPage from "./pages/ShowPage";
import Layout from "./pages/layout/Layout";
// import Nav from "./components/Nav";

const element = document.getElementById("root");

ReactDom.render(
  <StrictMode>
    <Router>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path=":id" element={<ShowPage />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
  element
);
