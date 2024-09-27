import { PropsWithChildren } from "react";
import styles from "@/components/Card/Card.module.css";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className={styles.card}>{children}</div>
    </>
  );
};

export default Card;
