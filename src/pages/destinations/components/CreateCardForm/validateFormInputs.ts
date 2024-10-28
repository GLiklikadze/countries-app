import { CardFormStateObj, SetCardFormErrorState } from "@/types/types";

export const validateInput = (
  fieldName: string,
  cardFormstate: CardFormStateObj,
  setCardFormErrorState: SetCardFormErrorState,
  lang: string,
) => {
  const {
    countryName,
    countryNameKa,
    population,
    capitalCity,
    capitalCityKa,
    area,
    currency,
    currencyKa,
  } = cardFormstate;

  let error = "";
  const onlyLettersRegex = /[^a-zA-Z]/;
  const georgianRegex = /[^\u10A0-\u10FF\s]/;

  if (fieldName === "countryName") {
    if (countryName.trim().length < 3) {
      error = "Country Name must be at least 3 characters long";
    } else if (onlyLettersRegex.test(countryName.trim())) {
      error = "Country Name must contain only letters";
    }
  }
  if (fieldName === "countryNameKa") {
    if (countryNameKa.trim().length < 3) {
      error = "ქვეყნის სახელი უნდა იყოს მინიმუმ 3 სიმბოლო";
    } else if (georgianRegex.test(countryNameKa.trim())) {
      error = " უნდა შეიცავდეს მხოლოდ ქართულ ასოებს";
    }
  }
  if (fieldName === "population") {
    if (+population < 1000) {
      error =
        lang === "ka"
          ? "მინიმალური რაოდენობაა 1000"
          : "Population must be at least 1000 citizen";
    }
  }
  if (fieldName === "capitalCity") {
    if (capitalCity.trim().length < 3) {
      error = "Capital City must be at least 3 characters long";
    } else if (onlyLettersRegex.test(capitalCity.trim())) {
      error = "Capital City must contain only letters";
    }
  }
  if (fieldName === "capitalCityKa") {
    if (capitalCityKa.trim().length < 3) {
      error = "უნდა იყოს მინიმუმ 3 სიმბოლო";
    } else if (georgianRegex.test(capitalCityKa.trim())) {
      error = "უნდა შეიცავდეს მხოლოდ ქართულ ასოებს";
    }
  }
  if (fieldName === "area") {
    if (+area < 100) {
      error =
        lang === "ka"
          ? "ფართობის მინიმალური რაოდენობა 100 კვ.მ"
          : "Area must be at least 100 km²";
    }
  }
  if (fieldName === "currency") {
    if (currency.trim().length < 2) {
      error = "Currency must be at least 2 characters long";
    } else if (onlyLettersRegex.test(currency.trim())) {
      error = "Currency must contain only letters";
    }
  }
  if (fieldName === "currencyKa") {
    if (currencyKa.trim().length < 2) {
      error = "უნდა იყოს მინიმუმ 2 სიმბოლო";
    } else if (georgianRegex.test(currencyKa.trim())) {
      error = "უნდა შეიცავდეს მხოლოდ ქართულ ასოებს";
    }
  }
  setCardFormErrorState((prevCardFormErrorState) => {
    return { ...prevCardFormErrorState, [`${fieldName}Error`]: error };
  });
};
