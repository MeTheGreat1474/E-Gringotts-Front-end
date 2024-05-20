import React, {useState,useEffect} from 'react'
import api from './api/axiosConfig'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/pages/Login'
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import Account from "./components/pages/Account";
import Transfer from "./components/pages/Transfer";
import Reload from "./components/pages/Reload";
import Receipt from "./components/pages/Receipt";
import Dashboard from "./components/pages/Dashboard";
import Admin from "./components/pages/Admin";

function App() {

    //TODO: CREATE CUSTOM CURSOR
    //TODO: CREATE APP DEPLOYMENT FOR WEBSITE

  return (
    <>
      <Router>
        <Routes>
            <Route path="/" exact element={<Login/>} />
            <Route path="/:username" element={<Home/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/:username/account' element={<Account/>} />
            <Route path='/:username/transfer' element={<Transfer/>} />
            <Route path='/:username/reload' element={<Reload/>} />
            <Route path='/:username/reload/receipt' element={<Receipt/>} />
            <Route path='/:username/admin' element={<Admin/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
