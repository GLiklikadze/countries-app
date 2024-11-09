import { useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader/CardHeader";
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
  const populationLabel = lang === "en" ? "Population" : "მოსახლეობა";
  const capitalCityLabel = lang === "en" ? "Capital City" : "დედაქალაქი";
  const areaLabel = lang === "en" ? "Country Area km²" : "ფართობი კმ²";
  const capCity = lang === "en" ? capitalCity : capitalCityKa;
  let cardDetails;
  if (isLoading) {
    cardDetails = <p>Loading Country Details...</p>;
  } else if (isSuccess) {
    cardDetails = (
      <div>
        <div className={styles.card_details_box}>
          <CardHeader
            countryName={lang === "en" ? countryName : countryNameKa}
            flagURL={flagURL}
          />
          <div className={styles.card_content_container}>
            <p>
              {populationLabel}: {Number(population).toLocaleString()}
            </p>
            <p>
              {capitalCityLabel}: {capCity}
            </p>
            <p>
              {areaLabel}: {Number(area).toLocaleString()}
            </p>
          </div>
          <CardFooter currency={lang === "en" ? currency : currencyKa} />
        </div>
        <button>Book now</button>
      </div>
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
