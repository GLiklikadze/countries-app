import { CardReducerInitialState, CountryInterface } from "@/types/types";

export type CardReducerAction = {
  type: "like" | "sort" | "create" | "delete";
  payload: any;
};

export const cardReducer = (
  countryData: CardReducerInitialState,
  action: CardReducerAction
) => {
  if (action.type === "sort") {
    const sortedData = [...countryData.country_data].sort((a, b) => {
      return countryData.toggleSort ? b.likes - a.likes : a.likes - b.likes;
    });
    return {
      ...countryData,
      country_data: sortedData,
      toggleSort: !countryData.toggleSort,
    };
  }
  if (action.type === "like") {
    const handleCardLike = (
      countryData: CardReducerInitialState,
      countryId: number
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
  if (action.type === "delete") {
    const handleCardDelete = (
      countryData: CardReducerInitialState,
      countryId: number
    ) => {
      return countryData.country_data.filter((country: CountryInterface) => {
        if (country.id !== countryId) {
          return country;
        }
      });
    };
    const newCountryData = handleCardDelete(countryData, action.payload.id!);
    return { ...countryData, country_data: newCountryData };
  }
};
