import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Reg } from "./reg"; 
import { Landing } from "./Landing";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import axios from 'axios'; 

export const AuthContext = React.createContext(null); 

const App = () => {

  useEffect(() => {
    fetchAll().then( result => {
      if (result) 
        setUsers(result); 
    });
  }, []); 

  const[users, setUsers] = useState([]); 

  async function CheckList(user){
    console.log("check " + user.user + "\t" + user.pass); 
    let result = await makePostCall(user); 
      if (result && result.status === 200) {
      console.log("Result " + result.status); 
      return true; 
    } else {
      return false; 
    } 
  }

  async function makePostCall(user){
    try {
      const response = await axios.post('http://localhost:4000/account/login', user); 
      return response; 
    } catch (error) {
      console.log(error); 
      return false; 
    }
  }

  async function makePostCallU(user){
    try {
      const response = await axios.post('http://localhost:4000/login/reg', user); 
      return response; 
    } catch (error) {
      console.log(error); 
      return false; 
    }
  }

  function updateList(user){
    makePostCallU(user).then(result => {
      if (result && result.status === 200)
      console.log(result); 
      setUsers([...users, result.data]); 
    });
  }

  async function fetchAll(){
    try{
      const response = await axios.get('http://localhost:4000/account/login'); 
      return response.data.users_list; 
    } catch (error) {
      console.log(error); 
      return false; 
    }
  }

  return (
    <AuthProvider>
    <Navigation />
   
    <h1>React Router</h1>

    <Routes>
      <Route index element={<Home handleSubmitU={CheckList} />} />
      <Route index element={<Reg handleAdd={updateList}/>} />
      <Route
  path="landing"
  element={
    <ProtectedRoute>
      <Landing />
    </ProtectedRoute>
  }
  />
      <Route path="home" element={<Home handleSubmitU={CheckList}/>} />
      <Route path="reg" element={<Reg handleAdd={updateList}/>} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  </AuthProvider>
);
};

const Navigation = () => {
  const { value } = useAuth();
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/reg">Reg</NavLink>
      <NavLink to="/landing">Landing</NavLink>
      {value.token && (
        <button type="button" onClick={value.onLogout}>
          Sign Out
      </button>
    )}
  </nav>
);}; 

export default App;
