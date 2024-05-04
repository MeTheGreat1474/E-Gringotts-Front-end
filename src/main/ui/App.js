import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/pages/Login'
import Dashboard from "./components/pages/Dashboard";
import SignUp from "./components/pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" exact element={<Login/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
