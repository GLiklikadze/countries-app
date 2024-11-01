import Card from "./components/Card/Card";
import Hero from "@/components/Hero/Hero";
import CardList from "./components/CardList/CardList";
import CardHeader from "./components/CardHeader/CardHeader";
import CardContent from "./components/CardContent/CardContent";
import CardFooter from "./components/CardFooter/CardFooter";
import { Link, useParams } from "react-router-dom";
import { FormEvent, useEffect, useReducer, useState } from "react";
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
import { formInitialObj } from "./components/CreateCardForm/initialStates";

const initialState = {
  country_data: [],
  toggleSort: false,
};
const DestinationsPage: React.FC = () => {
  const [countryData, dispatch] = useReducer(cardReducer, initialState);
  const [cardFormState, setCardFormState] =
    useState<CardFormStateObj>(formInitialObj);
  const [isEditingCard, setIsEditingCard] = useState<boolean>(false);
  console.log("DATA:", countryData);
  console.log("FORM:", cardFormState);
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

  const { lang } = useParams();

  const handleCardSortClick = () => {
    dispatch({ type: "sort", payload: null });
  };

  const handleCardDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await axios.delete(
        `http://localhost:3000/countries/${id}`,
      );

      if (response.status === 200 || response.status === 201) {
        dispatch({ type: "delete", payload: { id } });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting card:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };
  const handleLikeClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
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

  const handleCreateCard = async (
    event: FormEvent<HTMLFormElement>,
    formDataObject: CardFormStateObj,
  ) => {
    event.preventDefault();
    const uniqueId = Math.floor(Date.now() + Math.random() * 1000);
    const {
      countryName,
      population,
      capitalCity,
      currency,
      area,
      capitalCityKa,
      countryNameKa,
      currencyKa,
      flagURL,
    } = formDataObject;

    const newCard: CountryInterface = {
      countryName: countryName || "",
      population: population || 0,
      capitalCity: capitalCity || "",
      currency: currency || "",
      area: area || 0,
      capitalCityKa: capitalCityKa || "",
      countryNameKa: countryNameKa || "",
      currencyKa: currencyKa || "",
      flagURL: flagURL || "",
      isDeleted: false,
      imgUrl: [],
      likes: 0,
      id: uniqueId.toString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/countries",
        newCard,
      );
      if (response.status === 200 || response.status === 201) {
        const newCardPostRequestResult = response.data;
        dispatch({ type: "create", payload: { newCardPostRequestResult } });
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating card:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };
  const handleCardEdit = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setIsEditingCard((prevIsEditingCard) => !prevIsEditingCard);
    const selectedCard = countryData.country_data.filter(
      (card: CountryInterface) => card.id === id,
    );
    const {
      countryName,
      population,
      capitalCity,
      currency,
      area,
      capitalCityKa,
      countryNameKa,
      currencyKa,
      flagURL,
    } = selectedCard[0];

    setCardFormState((prevCardFormState) => ({
      ...prevCardFormState,
      countryName,
      population,
      capitalCity,
      currency,
      area,
      capitalCityKa,
      countryNameKa,
      currencyKa,
      flagURL,
      id,
    }));
    console.log(isEditingCard);
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    dispatch({
      type: "edit",
      payload: {
        id: id,
        cardFormState: cardFormState,
      },
    });
    setIsEditingCard((prevIsEditingCard) => !prevIsEditingCard);
    setCardFormState((prevCardFormState) => ({
      ...prevCardFormState,
      ...formInitialObj,
    }));
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
        <CreateCardForm
          onSubmit={handleCreateCard}
          cardFormState={cardFormState}
          setCardFormState={setCardFormState}
          isEditingCard={isEditingCard}
          handleEditClick={handleEditClick}
        />
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
                  handleCardEdit={handleCardEdit}
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
