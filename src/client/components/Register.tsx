import React from 'react';
import { AppState } from '../AppState';

const Register = () => {
  console.log("rendering Register");

  const {view, setView} = React.useContext(AppState);

  const [emailInput, setEmailInput] = React.useState<string>("");
  const [usernameInput, setUsernameInput] = React.useState<string>("");
  const [passwordInput, setPasswordInput] = React.useState<string>("");

  /// Functions

  const handleSubmit = () => {
    const responsePromise = fetch(
      `http://${window.location.hostname}:${window.location.port}/v1/auth/user/create`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          username: usernameInput,
        }),
      }
    );
    responsePromise.then((rawResponse : Response) => {
      const jsonResponsePromise: Promise<{session: string}> = rawResponse.json();

      jsonResponsePromise.then((jsonResponse : {session: string}) => {
        if (rawResponse.status == 200) {
          // upon successful login
          const session = jsonResponse.session;
          window.localStorage.setItem("session", session);
          console.log("user registered");
          console.log("session: ", session);
          setView("dashboard");
        } else {
          // upon failed login
          console.log("registration failed");
          window.alert("registration failed");
        }
      }).catch((err) => {
        console.error(err);
        window.alert("registration failed due to error");
      });
    }).catch((err) => {
      console.error(err);
      window.alert("registration failed due to error");
    });
  }

  /// Return statement

  return (
    <div className="register">
      <div className="register-form">
        <h1>Register</h1>
        <form name="register-form">
          <input
            placeholder = "email"
            className = 'email-register-input-box'
            onChange = {(event : React.ChangeEvent) => {
              setEmailInput(event.target.value);
            }}
          />
          <input
            placeholder = "username"
            className = 'username-register-input-box'
            onChange = {(event : React.ChangeEvent) => {
              setUsernameInput(event.target.value);
            }}
          />
          <input
            placeholder = "password"
            className = 'password-register-input-box'
            onChange = {(event : React.ChangeEvent) => {
              setPasswordInput(event.target.value);
            }}
          />
          {React.createElement('input', {
            type: 'submit',
            value: 'Submit',
            className: 'register-submit-button',
            onClick: (event : React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              handleSubmit();
            }
          })}
        </form>
      </div>
      <div className="already-have-account">
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