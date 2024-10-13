import { CardReducerInitialState, CountryInterface } from "@/types/types";

export type CardReducerAction = {
  type: "like" | "sort" | "create" | "delete";
  payload?: any;
};

export const cardReducer = (
  countryData: CardReducerInitialState,
  action: CardReducerAction
) => {
  if (action.type === "sort") {
    const filterDeletedCards = countryData.country_data.filter(
      (country) => !country.isDeleted
    );
    const deletedCards = countryData.country_data.filter(
      (country) => country.isDeleted
    );
    const sortedCards = [...filterDeletedCards].sort((a, b) => {
      return countryData.toggleSort ? b.likes - a.likes : a.likes - b.likes;
    });
    // const sortDeletedCards = [...sortedCards].sort((a, b) =>
    //   a.isDeleted === b.isDeleted ? 0 : a.isDeleted ? 1 : -1
    // );
    return {
      ...countryData,
      // country_data: [...sortDeletedCards],
      country_data: [...sortedCards, ...deletedCards],
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
  if (action.type === "create") {
    const newCard = {
      ...action.payload.formDataObject,
      // flagURL:
      //   "https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png",
      topAttractions: [],
      imgUrl: [],
      likes: 0,
      id: `${Date.now()}-${Math.random()}`,
    };

    return {
      ...countryData,
      country_data: [...countryData.country_data, newCard],
    };
  }
  if (action.type === "delete") {
    const handleCardDelete = (
      countryData: CardReducerInitialState,
      countryId: number
    ) => {
      return countryData.country_data.map((country: CountryInterface) => {
        if (country.id === countryId) {
          return { ...country, isDeleted: !country.isDeleted };
        }
        return country;
      });
    };
    const newCountryData = handleCardDelete(countryData, action.payload.id!);
    const sortDeletedCards = [...newCountryData].sort((a, b) =>
      a.isDeleted === b.isDeleted ? 0 : a.isDeleted ? 1 : -1
    );
    return { ...countryData, country_data: sortDeletedCards };
  }
  return countryData;
};
