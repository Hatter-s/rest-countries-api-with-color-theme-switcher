import React, { createContext, useState} from "react";

export const MainContext = createContext(null);

export default function MainContextProvider({ children }) {
  //find user system setting
  const isDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;

  const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  const [ darkMode, setDarkMode ] = useState(isDarkMode);

  const value = {
    regions,
    darkMode,
    setDarkMode
  };

  return (
    <MainContext.Provider value={value}>
      { children }
    </MainContext.Provider>
  )
}