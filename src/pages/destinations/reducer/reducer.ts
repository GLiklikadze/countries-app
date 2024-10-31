import { CardReducerInitialState, CountryInterface } from "@/types/types";

export type CardReducerAction =
  | { type: "like"; payload: { id: number } }
  | { type: "sort"; payload: null }
  | { type: "create"; payload: { formDataObject: Partial<CountryInterface> } }
  | { type: "delete"; payload: { id: number } }
  | { type: "set_countries"; payload: { country_data: CountryInterface[] } };

export const cardReducer = (
  countryData: CardReducerInitialState,
  action: CardReducerAction,
): CardReducerInitialState => {
  if (action.type === "set_countries") {
    return {
      ...countryData,
      country_data: action.payload.country_data,
    };
  }
  if (action.type === "sort") {
    const filterDeletedCards = countryData.country_data.filter(
      (country) => !country.isDeleted,
    );
    const deletedCards = countryData.country_data.filter(
      (country) => country.isDeleted,
    );
    const sortedCards = [...filterDeletedCards].sort((a, b) => {
      return countryData.toggleSort ? b.likes - a.likes : a.likes - b.likes;
    });
    return {
      ...countryData,
      country_data: [...sortedCards, ...deletedCards],
      toggleSort: !countryData.toggleSort,
    };
  }
  if (action.type === "like") {
    const handleCardLike = (
      countryData: CardReducerInitialState,
      countryId: number,
    ) => {
      return countryData.country_data.map((country: CountryInterface) => {
        if (country.id === countryId) {
          return { ...country, likes: country.likes + 1 };
        }
        return country;
      });
    };

    const updatedCountryData = handleCardLike(countryData, action.payload.id!);
    return {
      ...countryData,
      country_data: updatedCountryData,
    };
  }
  if (action.type === "create") {
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
      isDeleted,
    } = action.payload.formDataObject;

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
      isDeleted: isDeleted || false,
      imgUrl: [],
      likes: 0,
      id: uniqueId,
    };
    const updatedCards = [...countryData.country_data, newCard];
    const activeCards = updatedCards.filter((card) => !card.isDeleted);
    const deletedCards = updatedCards.filter((card) => card.isDeleted);

    return {
      ...countryData,
      country_data: [...activeCards, ...deletedCards],
    };
  }
  if (action.type === "delete") {
    const handleCardDelete = (
      countryData: CardReducerInitialState,
      countryId: number,
    ) => {
      return countryData.country_data.map((country: CountryInterface) => {
        if (country.id === countryId) {
          return { ...country, isDeleted: !country.isDeleted };
        }
        return country;
      });
    };
    const newCountryData = handleCardDelete(countryData, action.payload.id!);
    const activeCards = newCountryData.filter((card) => !card.isDeleted);
    const deletedCards = newCountryData.filter((card) => card.isDeleted);
    return { ...countryData, country_data: [...activeCards, ...deletedCards] };
  }
  return countryData;
};
