import country_data from "@/data/country-data";
import Card from "./components/Card/Card";
import Hero from "@/components/Hero/Hero";
import CardList from "./components/CardList/CardList";
import CardHeader from "./components/CardHeader/CardHeader";
import CardContent from "./components/CardContent/CardContent";
import CardFooter from "./components/CardFooter/CardFooter";
import { Link } from "react-router-dom";
import { useState } from "react";
import CardLikesBox from "./components/CardLikesBox/CardLikesBox";
import { CountryInterface } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

const DestinationsPage = () => {
  const [countryData, setCountryData] =
    useState<CountryInterface[]>(country_data);
  const [toggleSort, setToggleSort] = useState(false);

  const handleSortClick = () => {
    setCountryData((prevCountryData) => {
      if (toggleSort) {
        return [...prevCountryData].sort((a, b) => b.likes - a.likes);
      }
      return [...prevCountryData].sort((a, b) => a.likes - b.likes);
    });
    setToggleSort((prevIsSorted) => !prevIsSorted);
  };
  return (
    <>
      <Hero>
        <button onClick={handleSortClick}>
          <span>Sort</span>
          {toggleSort ? (
            <FontAwesomeIcon icon={faArrowDownShortWide} />
          ) : (
            <FontAwesomeIcon icon={faArrowUpWideShort} />
          )}
        </button>

        <CardList>
          {countryData.map((country) => (
            <Link to={`/destinations/${country.id}`} key={country.id}>
              <Card key={country.id}>
                <CardHeader
                  countryName={country.countryName}
                  flagURL={country.flagURL}
                />
                <CardContent
                  population={country.population}
                  capitalCity={country.capitalCity}
                  area={country.area}
                />
                <CardFooter
                  topAttractions={country.topAttractions}
                  currency={country.currency}
                />
                <CardLikesBox
                  likes={country.likes}
                  setCountryData={setCountryData}
                  countryId={country.id}
                />
              </Card>
            </Link>
          ))}
        </CardList>
      </Hero>
    </>
  );
};

export default DestinationsPage;
