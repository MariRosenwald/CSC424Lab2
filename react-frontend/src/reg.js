import React, { useState } from "react";
export const Reg = (props) => {

  const [ret, setRet] = useState(
    {
      user: "", 
      pass: "",
    }
  ); 

  function containsUppercase(str) {
    return /[A-Z]/.test(str);
  }

  function containsNumbers(str) {
    return /\d/.test(str);
  }
  

  const ProcessP = (e) => {
    if (containsUppercase(ret.pass) === false){
        alert("password must contain a capital letter."); 
    } else if (containsNumbers(ret.pass) === false) {
        alert("password must contain a number.");
    } else if (ret.pass.length < 8) {
        alert("password must be at least 8 characters long.");
    } else {
        props.handleAdd(ret); 
        setRet({user: '', pass: ''});
    }
    }


  return (
    <>
      <h2>Register (Public)</h2>
      <form>
      <label for="username">username</label>
        <input value={ret.user} onChange={(e) => setRet({user: e.target.value, pass: ret['pass']})}type="username" placeholder="username"></input>
        <label for="password">password</label>
        <input value={ret.pass} onChange={(e) => setRet({user: ret['user'], pass: e.target.value})}type="password" placeholder="****"></input>
        <button type="button" onClick={ProcessP}>
          Validate password / Sign up
        </button>
        </form>
  </>
);
};
