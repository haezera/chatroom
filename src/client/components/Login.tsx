'use strict';

// "to know how to make art, you gotta cover your hands with mud and crap first"
// ~ Jeff

import React from 'react';

const Login = () => {
  console.log("rendering Login");

  /// States

  const emailInputBundle = React.useState<string>("");
  let emailInput : string = emailInputBundle[0];
  const setEmailInput : React.Dispatch<React.SetStateAction<string>>= emailInputBundle[1];

  const passwordInputBundle = React.useState<string>("");
  let passwordInput : string = emailInputBundle[0];
  const setPasswordInput : React.Dispatch<React.SetStateAction<string>>= passwordInputBundle[1];

  /// Functions

  const handleSubmit = () => {
    const responsePromise = fetch(
      `http://${window.location.hostname}:${window.location.port}/v1/auth/user/login`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
        }),
      }
    );
    responsePromise.then((rawResponse : Response) => {
      const jsonResponsePromise: Promise<{session: string}> = rawResponse.json();

      jsonResponsePromise.then((jsonResponse : {session: string}) => {
        if (rawResponse.status == 200) {
          // upon successful login
          const session = jsonResponse.session;

        } else {
          // upon failed login

        }
      }).catch((err) => {
        console.error(err);
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  /// Return Value
  
  return (
    <div>
      <div className="login">
        <h1>Login</h1>
        <form name="login-form">
          {React.createElement("input", {
            placeholder: "email", 
            className: 'email-login-input-box',
            onChange: (event : React.ChangeEvent) => {
              setEmailInput(event.target.value);
            },
          })}
          {React.createElement("input", {
            placeholder: "password",
            className: 'password-login-input-box',
            onChange: (event : React.ChangeEvent) => {
              setPasswordInput(event.target.value);
            },
          })}
          {React.createElement('input', {
            type: 'submit',
            value: 'Submit',
            className: 'login-submit-button',
            onClick: (event : React.MouseEvent<HTMLButtonElement>) => {
              handleSubmit();
            }
          })}
        </form>
      </div>
    </div>
  );
};

export default Login;