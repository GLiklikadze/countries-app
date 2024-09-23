export interface CountryInterface {
  id: number;
  countryName: string;
  flagURL: string;
  population: number;
  capitalCity: string;
  area: string;
  topAttractions: string[];
  currency: string;
}

export interface CardProps {
  country: CountryInterface;
}
