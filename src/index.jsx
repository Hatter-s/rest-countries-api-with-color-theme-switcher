import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './router/root';
import Country from './router/detail_country';

import { getAllLoader } from './util/loader/main-loader';
import getCountryLoader from './util/loader/country-loader';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/:pagination?",
    loader: getAllLoader,
    element: <Root />
  },
  {
    path: "country/:country",
    loader: getCountryLoader,
    element: <Country/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
