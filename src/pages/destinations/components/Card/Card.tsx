import { CardProps } from "@/types/types";
import styles from "./Card.module.css";

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <>
      <div className={styles.card}>{children}</div>
    </>
  );
};

export default Card;
