import React, { useContext } from "react";
import { Form } from "react-router-dom";

import { HomeContext } from "./HomeContext";
import Search from "../../components/icon/search";
import CaretDown from "../../components/icon/caret-down";
import Card from "../../components/card/Card";

import "./Home.scss";
import Pagination from "../../components/pagination/Pagination";

export default function Home() {
  const {
    region,
    regions,
    filterForm,
    searchBar,
    regionsHidden,
    setRegionsHidden,
    regionInput,
    submit,
    currentCountries,
    changeRegion,
    focusSearchBar,
    buttonClass 
  } = useContext(HomeContext);

  return (
    <>
      <main>
        <div className="container">
          <div className="util-bar">
            <Form method="get" role="search" className="search element" onClick={focusSearchBar}>
              <Search />
              <input
                id="q"
                name="q"
                className="search-bar spec-element" placeholder="Search for a country..."
                ref={searchBar}
                onChange={(event) => {
                  submit(event.currentTarget.form);
                }}
              />
            </Form>

            <Form method="get" role="filter" rel={filterForm} >
              <input
                className="hidden"
                name="region"
                value={regionInput}
                readOnly
              />
              <div className="choose-region">
                <p
                  className="current-region element"
                  onClick={() => setRegionsHidden(!regionsHidden)}>
                  {region ? region : 'Filter by Region'}
                  <CaretDown />
                </p>
                <ul className={`regions element ${regionsHidden ? 'hidden' : 'd-block'}`}>
                  {regions.map(region => (
                    <li
                      key={region}
                      className="region"
                      onClick={() => changeRegion(region)}
                    >
                      {region}
                    </li>
                  ))}
                </ul>
              </div>
            </Form>
          </div>
          <div className="cards">
            {currentCountries
              ? currentCountries.map(country => {
                return (
                  <Card
                    key={country['altSpellings'][0]}
                    image={country['flags']['png']}
                    name={country['name']['common']}
                    population={country['population']}
                    region={country['region']}
                    capital={country['capital']}
                  />
                )
              })
              : <div className="no-country">No country is fond</div>
            }
            <Pagination context={HomeContext} buttonClass= {buttonClass} />
          </div>
        </div>
      </main>
    </>
  )
}