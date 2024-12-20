import { CardReducerInitialState, CountryInterface } from "@/types/types";

export type CardReducerAction =
  | { type: "set_countries"; payload: { country_data: CountryInterface[] } }
  | { type: "like"; payload: { id: string } }
  | { type: "sort"; payload: null }
  | {
      type: "create";
      payload: { newCardPostRequestResult: CountryInterface };
    }
  | { type: "delete"; payload: { id: string } }
  | { type: "edit"; payload: { id: string; updatedCountry: CountryInterface } };

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
    const sortedCards = countryData.country_data.sort((a, b) => {
      return countryData.toggleSort ? b.likes - a.likes : a.likes - b.likes;
    });
    return {
      ...countryData,
      country_data: sortedCards,
      toggleSort: !countryData.toggleSort,
    };
  }
  if (action.type === "like") {
    const updatedCountryArray = countryData.country_data.map((country) =>
      country.id === action.payload.id
        ? { ...country, likes: country.likes + 1 }
        : country,
    );

    return {
      ...countryData,
      country_data: updatedCountryArray,
    };
  }
  if (action.type === "create") {
    const newCard = action.payload.newCardPostRequestResult;
    return {
      ...countryData,
      country_data: [...countryData.country_data, newCard],
    };
  }
  if (action.type === "delete") {
    const activeCards = countryData.country_data.filter(
      (card: CountryInterface) => card.id !== action.payload.id,
    );
    return { ...countryData, country_data: activeCards };
  }
  if (action.type === "edit") {
    return {
      ...countryData,
      country_data: countryData.country_data.map((country) =>
        country.id === action.payload.id
          ? action.payload.updatedCountry
          : country,
      ),
    };
  }
  return countryData;
};
