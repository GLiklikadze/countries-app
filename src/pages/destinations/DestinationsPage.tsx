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

  console.log("DATA:", countryData);
  // console.log("FORM:", cardFormState);

  const {
    data: destinationsData,
    isLoading: isLoadingDestinationsList,
    isError: isErrorDestinations,
    refetch: reFetchDestinationsData,
    isSuccess,
  } = useQuery({
    queryKey: ["destinations-list"],
    queryFn: getDestinations,
    retry: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch({
        type: "set_countries",
        payload: { country_data: destinationsData },
      });
    }
  }, [isSuccess, destinationsData, dispatch]);

  // useEffect(() => {
  //   getDestinations()
  //     .then((countries) =>
  //       dispatch({
  //         type: "set_countries",
  //         payload: { country_data: countries },
  //       }),
  //     )
  //     .catch((error) => console.error("Error fetching countries", error));
  //   }, []);

  // .get("http://localhost:3000/countries")
  // .then((response) =>
  //   dispatch({
  //     type: "set_countries",
  //     payload: { country_data: response.data },
  //   }),
  // )

  const { lang } = useParams();

  const handleCardSortClick = () => {
    dispatch({ type: "sort", payload: null });
  };
  const { mutate: mutateDelete } = useMutation({
    mutationKey: ["delete-destination"],
    mutationFn: deleteDestination,
  });
  const handleCardDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    mutateDelete(id, {
      onSuccess: () => {
        // reFetchDestinationsData();
        dispatch({ type: "delete", payload: { id } });
      },
    });
    // try {
    //   const response = await axios.delete(
    //     `http://localhost:3000/countries/${id}`,
    //   );

    //   if (response.status === 200 || response.status === 201) {
    //     dispatch({ type: "delete", payload: { id } });
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.error("Error deleting card:", error.message);
    //   } else {
    //     console.error("An unknown error occurred:", error);
    //   }
    // }
  };
  const { mutate: mutateLike, isPending: isPendingLike } = useMutation({
    mutationKey: ["like-destination"],
    mutationFn: likeDestination,
  });

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
            // reFetchDestinationsData();
            dispatch({
              type: "like",
              payload: {
                id,
              },
            });
          },
        },
      );

      // try {
      //   const response = await axios.patch(
      //     `http://localhost:3000/countries/${id}`,
      //     { likes: newLikes },
      //   );
      //   if (response.status === 200 || response.status === 201) {
      //     dispatch({
      //       type: "like",
      //       payload: {
      //         id,
      //       },
      //     });
      //   }
      // } catch (error) {
      //   console.error("Like error", error);
      // }
    }
  };
  const { mutate: mutateCreate, isPending: isPendingCreate } = useMutation({
    mutationKey: ["create-destination"],
    mutationFn: createDestination,
  });
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

    // try {
    //   const response = await axios.post(
    //     "http://localhost:3000/countries",
    //     newCard,
    //   );
    //   if (response.status === 200 || response.status === 201) {
    //     const newCardPostRequestResult = response.data;
    //     dispatch({ type: "create", payload: { newCardPostRequestResult } });
    //   } else {
    //     console.error(response.statusText);
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.error("Error creating card:", error.message);
    //   } else {
    //     console.error("An unknown error occurred:", error);
    //   }
    // }
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

  const { mutate: mutateEdit, isPending: isPendingEdit } = useMutation({
    mutationKey: ["edit-destination"],
    mutationFn: editDestination,
  });

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
    // try {
    //   const response = await axios.put(
    //     `http://localhost:3000/countries/${id}`,
    //     updatedCountry,
    //   );
    //   if (response.status === 200 || response.status === 201) {
    //     const editRequestResult = response.data;
    //     dispatch({
    //       type: "edit",
    //       payload: {
    //         id: id,
    //         updatedCountry: editRequestResult,
    //       },
    //     });
    //   } else {
    //     console.error(response.statusText);
    //   }

    //   setCardFormState((prevCardFormState) => ({
    //     ...prevCardFormState,
    //     ...formInitialObj,
    //   }));
    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.error("Error creating card:", error.message);
    //   } else {
    //     console.error("An unknown error occurred:", error);
    //   }
    // }
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
                    // topAttractions={country.topAttractions}
                    currency={
                      lang === "en" ? country.currency : country.currencyKa
                    }
                  />
                  <CardLikesBox
                    likes={country.likes}
                    countryId={country.id}
                    isPendingLike={isPendingLike}
                    handleLikeClick={handleLikeClick}
                    handleCardDelete={handleCardDelete}
                    handleCardEdit={handleCardEdit}
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
