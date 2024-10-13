import { CardProps } from "@/types/types";
import styles from "./Card.module.css";

export const Card: React.FC<CardProps> = ({ children, isDeleted }) => {
  return (
    <>
      <div
        className={
          !isDeleted ? styles.card : `${styles.card} ${styles.card_deleted}`
        }
      >
        {children}
      </div>
    </>
  );
};

export default Card;
