import { CardContentProps } from "@/types/types";

const CardContent: React.FC<CardContentProps> = ({
  population,
  capitalCity,
  area,
}) => {
  return (
    <>
      <p>Population: {population}</p>
      <p>Capital City: {capitalCity}</p>
      <p>Area: {area} km²</p>
    </>
  );
};

export default CardContent;
