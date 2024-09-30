import trainIMG from "@/assets/train-bridge.jpg";
import styles from "@/components/Hero/Hero.module.css";
import { PropsWithChildren } from "react";

const Hero: React.FC<PropsWithChildren> = ({ children }) => {
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
      <div className={styles.country_info}>{children}</div>
    </section>
  );
};

export default Hero;