import React from 'react';

import Loading from './components/Loading';

const AppState = React.createContext();

const AppStateProvider : React.FC<{children: React.ReactNode[]}> = ({ children }) => {
  const [view, setView] = React.useState<string>("loading");

  return (
    <AppState.Provider value={{view, setView}}>
      { children }
    </AppState.Provider>
  );
};

export { AppState, AppStateProvider };