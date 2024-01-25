'use strict';

import React from 'react';
import { MessengerContextProvider } from './MessengerContext';
import Messenger from './Messenger';

import Logout from './Logout';

const Dashboard = () => {

  console.log("rendering Dashboard");
  

  /// Return value

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Logout />
      <div>
        <MessengerContextProvider>
          <Messenger />
        </MessengerContextProvider>
      </div>
    </div>
  );
};

export default Dashboard;