'use strict';

import React from 'react';
import Loading from './Loading';
import Login from './Login';
import Dashboard from './Dashboard';

const Window = () => {
  console.log("rendering Window");

  // // cursed
  // const sessionId = window.localStorage.getItem("sessionId");
  // if (sessionId === null) {
  //   setView(<Login />)
  // }

  // fetch(
  //   `http://${window.location.hostname}:${window.location.port}/v1/auth/session/validate`,
  //   {
  //     method: 'GET',
  //   }
  // ).then((res : Response) => {
  //   res.json().then((parsedResponse) => {
  //     if (parsedResponse.valid === true) {
  //       setView(<Dashboard />)
  //     } else {
  //       window.localStorage.removeItem("sessionId");
  //       setView(<Login />);
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }).catch((error) => {
  //   console.error(error);
  // });

  // return (
  //   {view}
  // );

  return (
    <>
      <Login />
      <Dashboard />
    </>
  )
};

export default Window;