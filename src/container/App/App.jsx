import React, { useContext } from "react";

import { MainContext } from "../../context/MainContext";
import Navbar from "../../components/navbar/Navbar";
import MainContextProvider from "../../context/MainContext";
import './App.scss';

function AppContainer ({ children }) {
  const { darkMode } = useContext(MainContext);

  return (
    <>
      <div 
        className={`${darkMode ? 'dark-mode' : 'light-mode'} contain-all`} 
      >
        { children }
      </div>
    </>
  )
}

export default function App({ children }) {

  return (
    <>
      <MainContextProvider>
        <AppContainer>
          <Navbar />
          { children }
        </AppContainer>
      </MainContextProvider>
    </>
  )
}