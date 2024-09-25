import { CardProps } from "../../types/types.ts";
import CardContent from "../CardContent/CardContent.tsx";
import CardFooter from "../CardFooter/CardFooter.tsx";
import CardHeader from "../CardHeader/CardHeader.tsx";
import styles from "./Card.module.css";

const Card: React.FC<CardProps> = ({ country }) => {
  const {
    countryName,
    flagURL,
    population,
    capitalCity,
    area,
    topAttractions,
    currency,
  } = country;
  return (
    <>
      <div className={styles.card}>
        <CardHeader countryName={countryName} flagURL={flagURL} />
        <CardContent
          population={population}
          capitalCity={capitalCity}
          area={area}
        />
        <CardFooter topAttractions={topAttractions} currency={currency} />
      </div>
    </>
  );
};

export default Card;
