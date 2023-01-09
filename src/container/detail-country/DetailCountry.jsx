import React, { useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

import ArrowLeft from "../../components/icon/arrow-left";

import './DetailCountry.scss';

export default function DetailCounTry() {
  const { countryData, codeAllCountries } = useLoaderData();

  let bordersCountriesName = countryData.borders
    ? countryData.borders.map(
      countryCode => codeAllCountries[countryCode]
    )
    : null;

  useEffect(() => { 
    document.title = countryData.name.common;
    document.querySelector('[rel=icon]').href = countryData.flags.png;
  }, [countryData]);
  const navigate = useNavigate();

  return (
    <>
      <div className="functional-buttons container">
        <button className="element" onClick={() => { navigate(-1) }}>
          <ArrowLeft /> Back
        </button>
      </div>
      <main>
        <div className="container">
          <div className="d-flex">
            <div className="flag">
              <img src={`${countryData.flags.png}`} alt="flag-of" />
            </div>
            <div className="information">
              <h1 className="name-country">
                {countryData.name.common}
              </h1>
              <div className="basic-information">
                <div>
                  <p>
                    <span className="strong">
                      Native Name:
                    </span>
                    {countryData.name.official}
                  </p>
                  <p>
                    <span className="strong">
                      Population:
                    </span>
                    {countryData.population}
                  </p>
                  <p>
                    <span className="strong">
                      Region:
                    </span>
                    {countryData.region}
                  </p>
                  <p>
                    <span className="strong">
                      Sub Region:
                    </span>
                    {countryData.subregion}
                  </p>
                  <p>
                    <span className="strong">
                      Capital:
                    </span>
                    {countryData.capital.join(', ')}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="strong">
                      Top Level Domain:
                    </span>
                    {countryData.tld.join(', ')}
                  </p>
                  <p>
                    <span className="strong">
                      Currencies:
                    </span>
                    {Object.keys(countryData.currencies).join(', ')}
                  </p>
                  <p>
                    <span className="strong">
                      Languages:
                    </span>
                    {Object.values(countryData.languages).join(', ')}
                  </p>
                </div>
              </div>
              <div className="border-countries">
                <span className="strong">Border Countries:</span>
                {bordersCountriesName
                  ? bordersCountriesName.map(country => (
                    <Link to={`/country/${country}`} key={`border-country-${country}`}>
                      <p className="box element">
                        {country}
                      </p>
                    </Link>
                  ))
                  : <span>No borders of this country</span>
                }
              </div>
            </div>
          </div>


        </div>
      </main>
    </>
  )
}