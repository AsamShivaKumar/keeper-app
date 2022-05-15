import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import Login from './components/Login.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
          {/* <Route path="/home" element={ <App /> } /> */}
          <Route path="/" element={ <Login /> } />
          <Route path="*" element={<main style={{ padding: "1rem" }}><p>There's nothing here!</p></main>} />
        </Routes>
    </BrowserRouter>
    , document.querySelector("#root")
);
