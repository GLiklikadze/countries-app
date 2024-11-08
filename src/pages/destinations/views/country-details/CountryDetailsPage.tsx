import { useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader/CardHeader";
import CardContent from "../../components/CardContent/CardContent";
import CardFooter from "../../components/CardFooter/CardFooter";
import { CountryInterface } from "@/types/types";
import styles from "./CountryDetailsPage.module.css";
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

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["destination-details", id],
    queryFn: () => getDestinationDetails(id as string),
    gcTime: 1000 * 50,
    staleTime: 1000 * 50,
  });
  useEffect(() => {
    if (isSuccess) {
      setCountryObj(data as CountryInterface);
    }
  }, [isSuccess, data]);

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
