import React from "react";
import { CardProps } from "../types/types.ts";

const Card: React.FC<CardProps> = ({ country }) => {
  const {
    countryName,
    flagURL,
    population,
    capitalCity,
    area,
    topAttractions,
  } = country;
  return (
    <>
      <div className="card">
        <h1>{countryName}</h1>
        <img src={flagURL} alt={`${countryName}-flag`} />
        <p>Population: {population}</p>
        <p>Capital City: {capitalCity}</p>
        <p>Area: {area} km²</p>
        <p>
          Top Attractions:&nbsp;
          {topAttractions.map((item, id) => (
            <span key={id}>{`${item},`}</span>
          ))}
        </p>
        <p>Currency: {country.currency}</p>
      </div>
    </>
  );
};

export default Card;
