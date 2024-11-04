import { CardHeaderProps } from "@/types/types";
import styles from "./CardHeader.module.css";

const CardHeader: React.FC<CardHeaderProps> = ({ countryName, flagURL }) => {
  return (
    <>
      <div className={styles.country_name_container}>
        <h1 className={styles.card_country_name}>{countryName}</h1>
      </div>
      <img
        src={flagURL}
        className={styles.card_flag}
        alt={`${countryName}-flag`}
      />
    </>
  );
};

export default CardHeader;
