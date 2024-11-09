import { CardContentProps } from "@/types/types";
import { useParams } from "react-router-dom";
import styles from "./CardContext.module.css";

const CardContent: React.FC<CardContentProps> = ({
  population,
  capitalCity,
  area,
}) => {
  const { lang } = useParams();
  const populationLabel = lang === "en" ? "Population" : "მოსახლეობა";
  const capitalCityLabel = lang === "en" ? "Capital City" : "დედაქალაქი";
  const areaLabel = lang === "en" ? "Country Area km²" : "ფართობი კმ²";
  return (
    <div className={styles.card_content_container}>
      <p>
        {populationLabel}: {Number(population).toLocaleString()}
      </p>
      <p>
        {capitalCityLabel}: {capitalCity}
      </p>
      <p>
        {areaLabel}: {Number(area).toLocaleString()}
      </p>
    </div>
  );
};

export default CardContent;
