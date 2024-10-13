import { CardContentProps } from "@/types/types";

const CardContent: React.FC<CardContentProps> = ({
  population,
  capitalCity,
  area,
}) => {
  return (
    <>
      <p>Population: {Number(population).toLocaleString()}</p>
      <p>Capital City: {capitalCity}</p>
      <p>Area: {Number(area).toLocaleString()} km²</p>
    </>
  );
};

export default CardContent;
