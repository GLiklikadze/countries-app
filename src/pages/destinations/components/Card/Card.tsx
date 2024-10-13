import { PropsWithChildren } from "react";
import styles from "./Card.module.css";

export const Card: React.FC<PropsWithChildren> = ({ children, isDeleted }) => {
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
