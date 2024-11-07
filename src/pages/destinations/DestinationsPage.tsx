import Card from "./components/Card/Card";
import styles from "./DestinationPage.module.css";
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
import { formInitialObj } from "./components/CreateCardForm/initialStates";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createDestination,
  deleteDestination,
  editDestination,
  getDestinations,
  likeDestination,
} from "@/api/destinations/httpDestinations";

const initialState = {
  country_data: [],
  toggleSort: false,
};
const DestinationsPage: React.FC = () => {
  const [countryData, dispatch] = useReducer(cardReducer, initialState);
  const [cardFormState, setCardFormState] =
    useState<CardFormStateObj>(formInitialObj);
  const [isEditingCard, setIsEditingCard] = useState<boolean>(false);
  const { lang } = useParams();
  // console.log("DATA:", countryData);

  const {
    data: destinationsData,
    isLoading: isLoadingDestinationsList,
    isError: isErrorDestinations,
    isSuccess,
  } = useQuery({
    queryKey: ["destinations-list"],
    queryFn: getDestinations,
    retry: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(destinationsData);
      dispatch({
        type: "set_countries",
        payload: {
          country_data: Array.isArray(destinationsData) ? destinationsData : [],
        },
      });
    }
  }, [isSuccess, destinationsData, dispatch]);

  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationKey: ["delete-destination"],
    mutationFn: deleteDestination,
  });
  const { mutate: mutateLike, isPending: isPendingLike } = useMutation({
    mutationKey: ["like-destination"],
    mutationFn: likeDestination,
  });
  const { mutate: mutateCreate, isPending: isPendingCreate } = useMutation({
    mutationKey: ["create-destination"],
    mutationFn: createDestination,
  });
  const { mutate: mutateEdit, isPending: isPendingEdit } = useMutation({
    mutationKey: ["edit-destination"],
    mutationFn: editDestination,
  });
  const handleCardDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    mutateDelete(id, {
      onSuccess: () => {
        dispatch({ type: "delete", payload: { id } });
      },
    });
  };

  const handleLikeClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const needToUpdateCountry = countryData.country_data.find(
      (country: CountryInterface) => country.id === id,
    );
    if (needToUpdateCountry) {
      const newLikes = needToUpdateCountry.likes + 1;
      mutateLike(
        { id, payload: { likes: newLikes } },
        {
          onSuccess: () => {
            dispatch({
              type: "like",
              payload: {
                id,
              },
            });
          },
        },
      );
    }
  };

  const handleCreateCard = async (
    event: FormEvent<HTMLFormElement>,
    formDataObject: CardFormStateObj,
  ) => {
    event.preventDefault();
    const {
      countryName,
      countryNameKa,
      population,
      capitalCity,
      capitalCityKa,
      currency,
      currencyKa,
      area,
      flagURL,
    } = formDataObject;

    const newCard: Partial<CountryInterface> = {
      countryName: countryName || "",
      population: population || 0,
      capitalCity: capitalCity || "",
      currency: currency || "",
      area: area || 0,
      capitalCityKa: capitalCityKa || "",
      countryNameKa: countryNameKa || "",
      currencyKa: currencyKa || "",
      flagURL: flagURL || "",
      likes: 0,
    };
    mutateCreate(newCard, {
      onSuccess: (newCardPostRequestResult: CountryInterface) => {
        dispatch({ type: "create", payload: { newCardPostRequestResult } });
      },
    });
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
  };

  const handleEditClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    const updatedCountryData = countryData.country_data.map((country) =>
      country.id === id ? { ...country, ...cardFormState } : country,
    );
    const updatedCountryArray = updatedCountryData.filter(
      (country) => country.id === id,
    );
    const updatedCountry = updatedCountryArray[0];
    setIsEditingCard((prevIsEditingCard) => !prevIsEditingCard);

    mutateEdit(
      { id, updatedCountry },
      {
        onSuccess: (data) => {
          dispatch({
            type: "edit",
            payload: {
              id: id,
              updatedCountry: data,
            },
          });
          setCardFormState((prevCardFormState) => ({
            ...prevCardFormState,
            ...formInitialObj,
          }));
        },
      },
    );
  };

  const handleCardSortClick = () => {
    dispatch({ type: "sort", payload: null });
  };
  const sortButtonIconToggle = countryData.toggleSort ? (
    <FontAwesomeIcon icon={faArrowDownShortWide} />
  ) : (
    <FontAwesomeIcon icon={faArrowUpWideShort} />
  );
  const sortButton = lang === "en" ? "Sort" : "სორტირება";
  const showSortButton = !isLoadingDestinationsList && (
    <button onClick={handleCardSortClick}>
      <span>{sortButton}</span>
      {sortButtonIconToggle}
    </button>
  );

  return (
    <>
      <div className={styles.destination_page_container}>
        <CreateCardForm
          onSubmit={handleCreateCard}
          cardFormState={cardFormState}
          setCardFormState={setCardFormState}
          isEditingCard={isEditingCard}
          handleEditClick={handleEditClick}
          isPendingCreate={isPendingCreate}
        />
        {isErrorDestinations ? (
          <p>Failed to load data from server. Please try again later.</p>
        ) : (
          showSortButton
        )}
        <CardList>
          {!isLoadingDestinationsList ? (
            countryData.country_data.map((country: CountryInterface) => (
              <Link to={`${country.id}`} key={country.id}>
                <Card key={country.id}>
                  <CardHeader
                    countryName={
                      lang === "en"
                        ? country.countryName
                        : country.countryNameKa
                    }
                    flagURL={country.flagURL}
                  />
                  <CardContent
                    population={country.population}
                    capitalCity={
                      lang === "en"
                        ? country.capitalCity
                        : country.capitalCityKa
                    }
                    area={country.area}
                  />
                  <CardFooter
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
                    isPendingLike={isPendingLike}
                    isPendingEdit={isPendingEdit}
                    isPendingDelete={isPendingDelete}
                  />
                </Card>
              </Link>
            ))
          ) : (
            <p>Please Wait, Loading Destinations From Server...</p>
          )}
        </CardList>
      </div>
    </>
  );
};

export default DestinationsPage;
