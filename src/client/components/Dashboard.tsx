'use strict';

import React from 'react';
import { AppState } from '../AppState';
import Logout from './Logout';

const Dashboard = () => {
  console.log("rendering Dashboard");
  
  const {view, setView} = React.useContext(AppState);

  return (
    <div>
      <h1>Dashboard</h1>
      <Logout />
    </div>
  );
};

export default Dashboard;