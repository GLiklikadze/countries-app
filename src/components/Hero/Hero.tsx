import trainIMG from "../../assets/train-bridge.jpg";
import countryData from "../../data/country-data.tsx";
import Card from "../Card/Card.tsx";
import { CountryInterface } from "../../types/types.ts";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
    <section className={styles.hero_section}>
      <img
        src={trainIMG}
        className={styles.hero_background_img}
        alt="swiss-train-bridge"
      />
      <div className={styles.hero_section_info}>
        <h2 className={styles.hero_section_heading}>
          Discover the World’s Hidden Gems
        </h2>
        <p>
          Explore breathtaking landscapes, rich cultures, and unforgettable
          experiences. Your next adventure starts here.
        </p>
      </div>

      <div className={styles.country_info}>
        {countryData.map((country: CountryInterface) => (
          <Card country={country} key={country.id} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
