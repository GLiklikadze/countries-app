import { useParams } from "react-router-dom";
import styles from "./CardList.module.css";

const CardList: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { lang } = useParams();
  return (
    <div
      className={`${styles.country_info} ${
        lang === "ka" ? styles.lang_ka : ""
      }`}
    >
      {children}
    </div>
  );
};

export default CardList;
