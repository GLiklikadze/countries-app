import { useParams } from "react-router-dom";
import styles from "../CreateCardForm/CreateCardForm.module.css";

export const useLabelsAndMessages = () => {
  const { lang } = useParams();
  const countryLabel = lang === "en" ? "Country Name" : "ქვეყანა";
  const populationLabel = lang === "en" ? "Population" : "მოსახლეობა";
  const capitalCityLabel = lang === "en" ? "Capital City" : "დედაქალაქი";
  const areaLabel = lang === "en" ? "Country Area km²" : "ფართობი კმ²";
  const currencyLabel = lang === "en" ? "Currency" : "ვალუტა";
  const flagUrlLabel = lang === "en" ? "Flag" : "დროშა";

  const destinationCreateBtn =
    lang === "en" ? "Create Destination" : "მიმართულების დამატება";
  const formClassName = `${styles.country_form} ${
    lang === "ka" ? styles.lang_ka : ""
  }`;
  const inputToggleButtonsTextGeo = lang === "ka" ? "ქარ" : "Geo";
  const inputToggleButtonsTextEng = lang === "en" ? "Eng" : "ინგ";
  const flagUploadError =
    lang === "ka"
      ? "დასაშვებია JPG ან PNG ფორმატის ფოტო"
      : "File must be a JPG or PNG image.";

  return {
    countryLabel,
    populationLabel,
    capitalCityLabel,
    areaLabel,
    currencyLabel,
    flagUrlLabel,
    destinationCreateBtn,
    formClassName,
    inputToggleButtonsTextGeo,
    inputToggleButtonsTextEng,
    flagUploadError,
  };
};

export default useLabelsAndMessages;
