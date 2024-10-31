import Card from "./components/Card/Card";
import Hero from "@/components/Hero/Hero";
import CardList from "./components/CardList/CardList";
import CardHeader from "./components/CardHeader/CardHeader";
import CardContent from "./components/CardContent/CardContent";
import CardFooter from "./components/CardFooter/CardFooter";
import { Link, useParams } from "react-router-dom";
import { FormEvent, useEffect, useReducer } from "react";
import CardLikesBox from "./components/CardLikesBox/CardLikesBox";
import { CardFormStateObj, CountryInterface } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { cardReducer } from "./reducer/reducer";
import CreateCardForm from "./components/CreateCardForm/CreateCardForm";
import axios from "axios";

const initialState = {
  country_data: [],
  toggleSort: false,
};
const DestinationsPage: React.FC = () => {
  const [countryData, dispatch] = useReducer(cardReducer, initialState);

  useEffect(() => {
    axios
      .get("http://localhost:3000/countries")
      .then((response) =>
        dispatch({
          type: "set_countries",
          payload: { country_data: response.data },
        }),
      )
      .catch((error) => console.error("Error fetching countries", error));
  }, []);

  console.log(countryData);
  const { lang } = useParams();

  const handleCardSortClick = () => {
    dispatch({ type: "sort", payload: null });
  };

  const handleCardDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({ type: "delete", payload: { id } });
  };

  const handleLikeClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
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

  const handleCreateCard = (
    event: FormEvent<HTMLFormElement>,
    formDataObject: CardFormStateObj,
  ) => {
    event.preventDefault();
    console.log(formDataObject);
    dispatch({ type: "create", payload: { formDataObject } });
  };

  const sortButtonIconToggle = countryData.toggleSort ? (
    <FontAwesomeIcon icon={faArrowDownShortWide} />
  ) : (
    <FontAwesomeIcon icon={faArrowUpWideShort} />
  );
  const sortButton = lang === "en" ? "Sort" : "სორტირება";
  return (
    <>
      <Hero>
        <button onClick={handleCardSortClick}>
          <span>{sortButton}</span>
          {sortButtonIconToggle}
        </button>
        <CreateCardForm onSubmit={handleCreateCard} />
        <CardList>
          {countryData.country_data.map((country: CountryInterface) => (
            <Link to={`${country.id}`} key={country.id}>
              <Card key={country.id} isDeleted={country.isDeleted}>
                <CardHeader
                  countryName={
                    lang === "en" ? country.countryName : country.countryNameKa
                  }
                  flagURL={country.flagURL}
                />
                <CardContent
                  population={country.population}
                  capitalCity={
                    lang === "en" ? country.capitalCity : country.capitalCityKa
                  }
                  area={country.area}
                />
                <CardFooter
                  // topAttractions={country.topAttractions}
                  currency={
                    lang === "en" ? country.currency : country.currencyKa
                  }
                />
                <CardLikesBox
                  likes={country.likes}
                  countryId={country.id}
                  handleLikeClick={handleLikeClick}
                  handleCardDelete={handleCardDelete}
                  isDeleted={country.isDeleted}
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
