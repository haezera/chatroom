'use strict';

import React from 'react';
import Loading from './Loading';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';

import { AppState } from '../AppState';

const Window = () => {
  console.log("rendering Window");

  const {view, setView} = React.useContext(AppState);

  // determine whether to display a dashboard or a login page
  React.useEffect(() => {
    console.log("running session check");
    const sessionId = window.localStorage.getItem("session");
    if (sessionId === null) {
      setView("login")
      return;
    }

    fetch(
      `http://${window.location.hostname}:${window.location.port}/v1/auth/session/validate`,
      {
        method: 'GET',
      }
    ).then((res : Response) => {
      res.json().then((parsedResponse) => {
        console.log(parsedResponse);
        if (parsedResponse.valid === true) {
          setView("dashboard")
        } else {
          window.localStorage.removeItem("session");
          setView("login");
        }
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div>
      {(() => {
        switch(view) {
          case "login":
            return <Login />
          case "dashboard":
            return <Dashboard />
          case "loading":
            return <Loading />
          case "register":
            return <Register />
        }
      })()}
    </div>
  );
};

export default Window;