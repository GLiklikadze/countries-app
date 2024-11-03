import { useNavigate, useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader/CardHeader";
import CardContent from "../../components/CardContent/CardContent";
import CardFooter from "../../components/CardFooter/CardFooter";
import { CountryInterface } from "@/types/types";
import styles from "./CountryDetailsPage.module.css";
// import PhotoGallery from "./components/PhotoGallery";
import { useEffect, useState } from "react";
import axios from "axios";

const initialCountryObj = {
  id: "-1",
  countryName: "",
  countryNameKa: "",
  flagURL: "",
  population: "",
  capitalCity: "",
  capitalCityKa: "",
  area: "",
  currency: "",
  currencyKa: "",
  imgUrl: [],
  likes: 0,
  isDeleted: false,
};

const CountryDetailsPage = () => {
  const [countryObj, setCountryObj] =
    useState<CountryInterface>(initialCountryObj);

  const {
    countryName,
    countryNameKa,
    flagURL,
    area,
    capitalCity,
    capitalCityKa,
    population,
    currency,
    currencyKa,
  } = countryObj;

  const { lang, id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/countries/${id}`)
      .then((response) => {
        if (response.data) {
          setCountryObj(response.data);
        } else {
          navigate(-1);
        }
      })
      .catch(() => {
        navigate(-1);
      });
  }, [id, setCountryObj, navigate]);

  console.log(countryObj);

  if (!countryObj) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.country_details_container}>
      <div className={styles.card_details_container}>
        <div className={styles.card_details_box}>
          <CardHeader
            countryName={lang === "en" ? countryName : countryNameKa}
            flagURL={flagURL}
          />
          <CardContent
            area={area}
            capitalCity={lang === "en" ? capitalCity : capitalCityKa}
            population={population}
          />
          <CardFooter
            currency={lang === "en" ? currency : currencyKa}
            // topAttractions={country.topAttractions}
          />
        </div>
        {/* <PhotoGallery country={countryObj} /> */}
        <button>Book now</button>
      </div>
    </div>
  );
};

export default CountryDetailsPage;
