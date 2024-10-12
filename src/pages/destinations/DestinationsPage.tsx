import country_data from "@/data/country-data";
import Card from "./components/Card/Card";
import Hero from "@/components/Hero/Hero";
import CardList from "./components/CardList/CardList";
import CardHeader from "./components/CardHeader/CardHeader";
import CardContent from "./components/CardContent/CardContent";
import CardFooter from "./components/CardFooter/CardFooter";
import { Link } from "react-router-dom";
import { useReducer } from "react";
import CardLikesBox from "./components/CardLikesBox/CardLikesBox";
import { CountryInterface } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowUpWideShort,
  // faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { cardReducer } from "./reducer/reducer";

const initialState = {
  country_data: country_data,
  toggleSort: false,
};

const DestinationsPage: React.FC = () => {
  const [countryData, dispatch] = useReducer(cardReducer, initialState);

  const handleCardSortClick = () => {
    dispatch({ type: "sort" });
  };

  const handleCardDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({ type: "delete", payload: { id } });
  };

  const handleLikeClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({
      type: "like",
      payload: {
        id,
      },
    });
  };

  return (
    <>
      <Hero>
        <button onClick={handleCardSortClick}>
          <span>Sort</span>
          {countryData.toggleSort ? (
            <FontAwesomeIcon icon={faArrowDownShortWide} />
          ) : (
            <FontAwesomeIcon icon={faArrowUpWideShort} />
          )}
        </button>
        <CardList>
          {countryData.country_data.map((country: CountryInterface) => (
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
                  // setCountryData={setCountryData}
                  countryId={country.id}
                  handleLikeClick={handleLikeClick}
                  handleCardDelete={handleCardDelete}
                />
              </Card>
              {countryData.deletedCards && countryData.deletedCards}
            </Link>
          ))}
        </CardList>
      </Hero>
    </>
  );
};

export default DestinationsPage;
