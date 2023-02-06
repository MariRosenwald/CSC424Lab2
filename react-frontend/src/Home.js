import { useAuth } from "./context/AuthProvider";
import React, { useState } from "react";
export const Home = () => {
  const { value } = useAuth();
  const [username, setUser] = useState(''); 
  const [password, setPass] = useState(''); 

  const displayIC = (e) => {
    if(value.token === null){
      alert("incorrect username or password (username: bj password: pass424)")
    } else {
      alert("already logged in")
    }
  }

  return (
    <>
      <h2>Home (Public)</h2>
      <form>
        <label for="username">username</label>
        <input value={username} onChange={(e) => setUser(e.target.value)}type="username" placeholder="username"></input>
        <label for="password">password</label>
        <input value={password} onChange={(e) => setPass(e.target.value)}type="password" placeholder="****"></input>
        <button type="button" onClick={(username==="bj" && password === "pass424" && value.onLogin) || displayIC}>
          Sign In
        </button>
        </form>
  </>
);
};
