'use strict';

import React from 'react';
import Loading from './components/Loading';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Window from './components/Window';
import { AppStateProvider } from './AppState';

const App = () => {
  console.log("rendering App");
  return (
    <AppStateProvider>
      <Window />
    </AppStateProvider>
  );
};

export default App;