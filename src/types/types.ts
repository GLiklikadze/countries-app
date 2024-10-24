export interface CountryInterface {
  id: number;
  countryName: string;
  countryNameKa: string;
  flagURL: string;
  population: number;
  capitalCity: string;
  capitalCityKa: string;
  area: string;
  topAttractions: string[];
  currency: string;
  currencyKa: string;
  imgUrl: string[];
  likes: number;
  isDeleted: boolean;
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
  population: number;
  capitalCity: string;
  area: string;
}
export interface CardFooterProps {
  topAttractions?: string[];
  currency: string;
}
export type PhotoGalleryProps = {
  country: CountryInterface;
};

export type CardProps = {
  children: React.ReactNode;
  isDeleted: boolean;
};

export type CardLikesBoxProps = {
  likes: number;
  countryId: number;
  handleLikeClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => void;

  handleCardDelete: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => void;
  isDeleted: boolean;
};
export type CreateCardFormProps = {
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formDataObject: CardFormStateObj
  ) => void;
};

export interface CardFormStateObj {
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
