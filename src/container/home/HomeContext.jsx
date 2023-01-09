import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {  useLoaderData, useSubmit, useMatches } from "react-router-dom";
import { MainContext } from "../../context/MainContext";

export const HomeContext = createContext(null);

export default function HomeContextProvider({ children }) {
  const { countries, q, region } = useLoaderData();
  const { regions } = useContext(MainContext);

  //ref element
  const filterForm = useRef(null);
  const searchBar = useRef(null);

  const [regionsHidden, setRegionsHidden] = useState(true);
  const [regionInput, setRegionInput] = useState(region ? region : '');
  const display = 12;
  const buttonClass = 'paging-button element';
  const submit = useSubmit();

  //find how many page we need to pagination
  function handlePagePagination(arr, currentPage, display) {
    if (!arr) {
      return undefined;
    }
    const currentData = arr
      .slice(display * (currentPage - 1), display * currentPage);
    return currentData;
  }

  function paging(elements, display) {
    if (!elements) {
      return 1;
    }
  
    return Math.ceil(elements / display) ;
  }

  useEffect(() => {
    document.title = 'rest countries api';
    document.querySelector('[rel=icon]').href = "%PUBLIC_URL%/global.png";
  }, [])

  const pages = useMemo(()=> {
    if(!countries) {
      return 1;
    }
    return paging(countries.length, display);
  }, [countries]);
  const matches = useMatches();
  const [currentPage, setCurrentPage] = useState(matches[0].params?.pagination ? Number(matches[0].params?.pagination) : 1);
  const currentCountries = useMemo(() => handlePagePagination(countries, currentPage, display), [countries, currentPage]);

  useEffect(() => {
    searchBar.current.value = q;
  }, [q])


  const changeRegion = async (region) => {
    // setCurrentRegion(region);
    await setRegionInput(region);
    submit(document.querySelector('[role=filter]'));
    setRegionsHidden(true);
  }

  const focusSearchBar = () => {
    searchBar.current.focus();
  }


  const value = {
    countries,
    q,
    region,
    regions,
    filterForm,
    searchBar,
    regionsHidden,
    setRegionsHidden,
    regionInput,
    setRegionInput,
    display,
    submit,
    pages,
    currentPage,
    setCurrentPage,
    currentCountries,
    changeRegion,
    focusSearchBar,
    buttonClass
  }

  return (
    <HomeContext.Provider value={value}>
      { children }
    </HomeContext.Provider>
  )
}