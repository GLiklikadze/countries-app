import { useNavigate, useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader/CardHeader";
import CardContent from "../../components/CardContent/CardContent";
import CardFooter from "../../components/CardFooter/CardFooter";
import { CountryInterface } from "@/types/types";
import styles from "./CountryDetailsPage.module.css";
// import PhotoGallery from "./components/PhotoGallery";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDestinationDetails } from "@/api/destinations/httpDestinationDetails";

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
  likes: 0,
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

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["destination-details", id],
    queryFn: () => getDestinationDetails(id as string),
  });
  useEffect(() => {
    if (isSuccess) {
      setCountryObj(data as CountryInterface);
    }
  }, [isSuccess, data, navigate]);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/countries/${id}`)
  //     .then((response) => {
  //       if (response.data) {
  //         setCountryObj(response.data);
  //       } else {
  //         navigate(-1);
  //       }
  //     })
  //     .catch(() => {
  //       navigate(-1);
  //     });
  // }, [id, setCountryObj, navigate]);

  console.log(countryObj);

  let cardDetails;
  if (isLoading) {
    cardDetails = <p>Loading Country Details...</p>;
  } else if (isSuccess) {
    cardDetails = (
      <>
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
          <CardFooter currency={lang === "en" ? currency : currencyKa} />
        </div>
        <button>Book now</button>
      </>
    );
  } else if (isError) {
    cardDetails = <p>{error.message}</p>;
  }

  return (
    <div className={styles.country_details_container}>
      <div className={styles.card_details_container}>{cardDetails}</div>;
    </div>
  );
};

export default CountryDetailsPage;
