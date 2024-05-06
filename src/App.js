import React, {useState,useEffect} from 'react'
import api from './api/axiosConfig'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/pages/Login'
import Dashboard from "./components/pages/Dashboard";
import SignUp from "./components/pages/SignUp";

function App() {

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
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
