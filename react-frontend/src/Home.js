import { useAuth } from "./context/AuthProvider";
import React, { useState } from "react";

export const Home = (props) => {
  
  const [ret, setRet] = useState(
    {
      user: "", 
      pass: "",
    }
  ); 


  function displayIC() {
    if(value.token === null){
      alert("incorrect username or password (username: bj password: pass424)")
    } else {
      alert("already logged in")
    }
  }

const submitFormU = async () => {
    // setRet({user: username, pass: 'pass424'});
    console.log("submitFormU " + ret.user + "\t" + ret.pass);
    const l = await props.handleSubmitU(ret); 
    console.log("Stat: " + l); 
    setRet({user: '', pass: ''}); 
    if(l && value.token == null){
    return value.onLogin();  
    } 
    else {
      displayIC(); 
    }
  }

  const { value } = useAuth();

  return (
    <>
      <h2>Home (Public)</h2>
      <form>
        <label for="username">username</label>
        <input value={ret.user} onChange={(e) => setRet({user: e.target.value, pass: ret['pass']})}type="username" placeholder="username"></input>
        <label for="password">password</label>
        <input value={ret.pass} onChange={(e) => setRet({user: ret['user'], pass: e.target.value})}type="password" placeholder="****"></input>
        <button type="button" onClick={submitFormU}>
          Sign In
        </button>
        </form>
  </>
);
};
