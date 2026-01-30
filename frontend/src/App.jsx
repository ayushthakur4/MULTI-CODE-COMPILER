import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditorPage from "./pages/EditorPage";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";

const App = () => {
  return (
    <BrowserRouter>
      <RouteHandler />
    </BrowserRouter>
  );
};

const RouteHandler = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default App;
