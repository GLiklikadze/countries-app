import styles from "./CardList.module.css";

const CardList: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.country_info}>{children}</div>;
};

export default CardList;
