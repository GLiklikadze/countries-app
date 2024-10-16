import { useLocation, useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader/CardHeader";
import CardContent from "../../components/CardContent/CardContent";
import CardFooter from "../../components/CardFooter/CardFooter";
import { CountryInterface } from "@/types/types";
import styles from "./CountryDetailsPage.module.css";
import PhotoGallery from "./components/PhotoGallery";

const CountryDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { countryData } = location.state || {};
  return (
    <div className={styles.country_details_container}>
      {countryData.country_data
        .filter((country: CountryInterface) => country.id === Number(id))
        .map((country: CountryInterface) => (
          <div className={styles.card_details_container} key={country.id}>
            <div className={styles.card_details_box}>
              <CardHeader
                countryName={country.countryName}
                flagURL={country.flagURL}
              />
              <CardContent
                area={country.area}
                capitalCity={country.capitalCity}
                population={country.population}
              />
              <CardFooter
                currency={country.currency}
                topAttractions={country.topAttractions}
              />
            </div>
            <PhotoGallery country={country} />
            <button>Book now</button>
          </div>
        ))}
    </div>
  );
};

export default CountryDetailsPage;
