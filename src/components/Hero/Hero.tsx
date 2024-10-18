import trainIMG from "@/assets/train-bridge.jpg";
import styles from "./Hero.module.css";
import { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";

const Hero: React.FC<PropsWithChildren> = ({ children }) => {
  const { lang } = useParams();

  const heroSectionHeading =
    lang === "en"
      ? "Discover the World’s Hidden Gems"
      : "აღმოაჩინე მსოფლიოს დამალული განძი";
  return (
    <section className={styles.hero_section}>
      <img
        src={trainIMG}
        className={styles.hero_background_img}
        alt="swiss-train-bridge"
      />
      <div className={styles.hero_section_info}>
        {!children && (
          <>
            <h2 className={styles.hero_section_heading}>
              {heroSectionHeading}
            </h2>
            <p>
              {lang === "en"
                ? "Explore breathtaking landscapes, rich cultures, and unforgettable experiences. Your next adventure starts here."
                : "გამოიკვლიეთ თვალწარმტაცი პეიზაჟები, მდიდარი კულტურები და დაუვიწყარი გამოცდილება. თქვენი შემდეგი თავგადასავალი აქ იწყება."}
            </p>
          </>
        )}
      </div>
      {children}
    </section>
  );
};

export default Hero;
