import React from 'react';

const AppState = React.createContext();

const AppStateProvider : React.FC<{children: React.ReactNode[]}> = ({ children }) => {
  const [view, setView] = React.useState<string>("loading");

  return React.createElement(
    AppState.Provider,
    {value: {view, setView}},
    children
  );
};

export { AppState, AppStateProvider };