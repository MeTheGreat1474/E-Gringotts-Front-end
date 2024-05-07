import React, {useState,useEffect} from 'react'
import api from './api/axiosConfig'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/pages/Login'
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import Account from "./components/pages/Account";

function App() {

    //TODO: CREATE CUSTOM CURSOR
    //TODO: CREATE APP DEPLOYMENT FOR WEBSITE

    // const [users,setUsers] = useState();
    // const username = "admin"
    // const password = "admin"
    //
    // const getUsers = async () => {
    //     try {
    //         const response = await api.get("/Account/home")
    //         setUsers(response.data)
    //         console.log(response.data)
    //     }
    //     catch (err){
    //         console.log(err)
    //     }
    // }
    //
    // useEffect(() => {
    //     getUsers();
    // },[])

  return (
    <>
      <Router>
        <Routes>
            <Route path="/" exact element={<Login/>} />
            <Route path="/:username" element={<Home/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/:username/Account' element={<Account/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
