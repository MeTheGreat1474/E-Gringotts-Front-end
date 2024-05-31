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
import ReloadReceipt from "./components/pages/ReloadReceipt";
import Dashboard from "./components/pages/Dashboard";
import Admin from "./components/pages/Admin";
import TransferConfirm from "./components/pages/TransferConfirm";
import LoginAuth from "./components/pages/LoginAuth";
import Analytic from "./components/pages/Analytic";
import TransactionHistory from "./components/Transaction/TransactionHistory";
import TransactionHistoryReceipt from "./components/pages/TransactionHistoryReceipt";
import TransferReceipt from "./components/pages/TransferReceipt";
import Exchange from "./components/pages/Exchange";

function App() {

    //TODO: CREATE CUSTOM CURSOR
    //TODO: CREATE APP DEPLOYMENT FOR WEBSITE

  return (
    <>
      <Router>
        <Routes>
            <Route path="/" exact element={<Login/>} />
            <Route path="/auth" element={<LoginAuth/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path="/:username" element={<Home/>} />
            <Route path='/:username/account' element={<Account/>} />
            <Route path='/:username/transfer' element={<Transfer/>} />
            <Route path='/:username/transfer/confirm' element={<TransferConfirm/>} />
            <Route path='/:username/transfer/receipt' element={<TransferReceipt/>} />
            <Route path='/:username/reload' element={<Reload/>} />
            <Route path='/:username/reload/receipt' element={<ReloadReceipt/>} />
            <Route path='/:username/transaction/receipt' element={<TransactionHistoryReceipt/>} />
            <Route path='/:username/admin' element={<Admin/>} />
            <Route path='/:username/analytic' element={<Analytic/>} />
            <Route path='/:username/exchange' element={<Exchange/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
