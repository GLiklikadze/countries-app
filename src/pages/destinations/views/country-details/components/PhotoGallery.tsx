import { CountryArray } from "@/types/types";
import styles from "./PhotoGallery.module.css";
const PhotoGallery: React.FC<CountryArray> = ({ country }) => {
  return (
    <div className={styles.photos_container}>
      {country.imgUrl.map((url) => (
        <div key={url}>
          <img src={new URL(url, import.meta.url).href} alt="country-photo" />
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
