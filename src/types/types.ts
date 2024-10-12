export interface CountryInterface {
  id: number;
  countryName: string;
  flagURL: string;
  population: number;
  capitalCity: string;
  area: string;
  topAttractions: string[];
  currency: string;
  imgUrl: string[];
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
  population: number;
  capitalCity: string;
  area: string;
}
export interface CardFooterProps {
  topAttractions: string[];
  currency: string;
}
