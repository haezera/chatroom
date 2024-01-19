'use strict';

import React from 'react';
import Logout from './Logout';

const Dashboard = () => {
  console.log('rendering Dashboard');

  return (
    <div>
      <h1>Dashboard</h1>
      <Logout />
    </div>
  );
};

export default Dashboard;
