import React from 'react';
import { AppState } from '../AppState';

const Register = () => {
  console.log("rendering Register");

  const {view, setView} = React.useContext(AppState);

  return (
    <div>
      <div>
        <h1>Register</h1>
        <p>insert form here</p>
      </div>
      <div>
        <p>Already have an account?</p>
        <a
          href=""
          onClick={(event) => {
            event.preventDefault();
            setView("login");
          }}
        >Login</a>
      </div>
    </div>
  )
}

export default Register;