import { useParams } from "react-router-dom";
import styles from "./Experience.module.css";

const Experience = () => {
  const { lang } = useParams();
  const experiencePageHeading =
    lang === "en" ? "Experiences Page" : "გამოცდილებების გვერდი";
  return (
    <main className={styles["experience_page_container"]}>
      <h1>{experiencePageHeading}</h1>
    </main>
  );
};

export default Experience;
