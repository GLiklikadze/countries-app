export interface CountryInterface {
  id: string;
  countryName: string;
  countryNameKa: string;
  flagURL: string;
  population: number | string;
  capitalCity: string;
  capitalCityKa: string;
  area: string | number;
  currency: string;
  currencyKa: string;
  likes: number;
}

export interface CardReducerInitialState {
  country_data: CountryInterface[];
  toggleSort: boolean;
}

export interface CardHeaderProps {
  countryName: string;
  flagURL: string;
}
export interface CardContentProps {
  population: number | string;
  capitalCity: string;
  area: number | string;
}
export interface CardFooterProps {
  // topAttractions?: string[];
  currency: string;
}
export type PhotoGalleryProps = {
  country: CountryInterface;
};

export type CardProps = {
  children: React.ReactNode;
};

export type CardLikesBoxProps = {
  likes: number;
  countryId: string;
  handleLikeClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => void;
  handleCardDelete: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => void;
  handleCardEdit: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => void;
  isPendingLike: boolean;
};
export type CreateCardFormProps = {
  cardFormState: CardFormStateObj;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formDataObject: CardFormStateObj,
  ) => void;
  isEditingCard: boolean;
  handleEditClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => void;
  setCardFormState: React.Dispatch<React.SetStateAction<CardFormStateObj>>;
  isPendingCreate: boolean;
};

export interface CardFormStateObj {
  id: string;
  countryName: string;
  countryNameKa: string;
  population: number | string;
  capitalCity: string;
  capitalCityKa: string;
  area: number | string;
  currency: string;
  currencyKa: string;
  flagURL: string;
}
export interface cardFormErrorState {
  countryNameError: string;
  countryNameKaError: string;
  populationError: string;
  capitalCityError: string;
  capitalCityKaError: string;
  areaError: string;
  currencyError: string;
  currencyKaError: string;
  flagURLError: string;
}
export type SetCardFormErrorState = React.Dispatch<
  React.SetStateAction<cardFormErrorState>
>;
