import { CardHeaderProps } from "../../types/types";
import styles from "./CardHeader.module.css";

const CardHeader: React.FC<CardHeaderProps> = ({ countryName, flagURL }) => {
  return (
    <>
      <h1 className={styles.card_country_Name}>{countryName}</h1>
      <img
        src={flagURL}
        className={styles.card_flag_url}
        alt={`${countryName}-flag`}
      />
    </>
  );
};

export default CardHeader;
