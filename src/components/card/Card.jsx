import React from 'react';
import { Link } from 'react-router-dom';

import "./Card.scss";

export default function Card({ image, name, population, region, capital }) {
  return (
    <>
      <Link to={`/country/${name}`} >
        <div className='card element'>
          <div className='head'>
            <img src={image} alt='card head' />
          </div>
          <div className='body'>
            <h2 className='title'>
              {name}
            </h2>
            <p>Population: {population}</p>
            <p>Region: {region}</p>
            <p>Capital: {capital}</p>
          </div>
        </div>
      </Link>
    </>
  )
}