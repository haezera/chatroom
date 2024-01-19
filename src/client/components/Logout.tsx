import React from 'react';

import { AppState } from '../AppState';

const Logout = () => {
  const { view, setView } = React.useContext(AppState);

  return (
    <button
      onClick={() => {
        const responsePromise = fetch(
          `http://${window.location.hostname}:${window.location.port}/v1/auth/user/logout`,
          {
            method: 'DELETE',
            headers: {
              session: window.localStorage.getItem('session'),
            },
          }
        );
        responsePromise.then((response) => {
          window.localStorage.removeItem('session');
          setView('login');
        });
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
