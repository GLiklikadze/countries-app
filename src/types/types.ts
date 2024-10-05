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
}

export interface CountryArray {
  country: CountryInterface;
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
