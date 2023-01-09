import React from "react";
import Home from "../container/home/Home";
import HomeContextProvider from "../container/home/HomeContext";
import App from "../container/App/App";

export default function Root() {

  return (
    <>
      <App>
        <HomeContextProvider >
          <Home />
        </HomeContextProvider>
      </App>
    </>
  )
}