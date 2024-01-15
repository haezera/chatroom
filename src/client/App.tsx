'use strict';

import React from 'react';
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