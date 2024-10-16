import { CardFormStateObj, CreateCardFormProps } from "@/types/types";
import styles from "./CreateCardForm.module.css";
import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";

const formInitialObj = {
  countryName: "",
  population: "",
  capitalCity: "",
  area: "",
  currency: "",
  flagURL: "",
};

const formErrorInitialMsg = {
  countryNameError: "",
  populationError: "",
  capitalCityError: "",
  areaError: "",
  currencyError: "",
  flagURLError: "",
};
const CreateCardForm: React.FC<CreateCardFormProps> = ({ onSubmit }) => {
  const [cardFormstate, setCardFormState] =
    useState<CardFormStateObj>(formInitialObj);
  const [cardFormErrorState, setCardFormErrorState] =
    useState(formErrorInitialMsg);
  const { countryName, population, capitalCity, area, currency, flagURL } =
    cardFormstate;
  const {
    countryNameError,
    populationError,
    capitalCityError,
    areaError,
    currencyError,
    flagURLError,
  } = cardFormErrorState;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCardFormState((prevCardFormSate) => {
      return { ...prevCardFormSate, [name]: value };
    });
  };

  const validateInput = (fieldName: string) => {
    let error = "";
    const onlyLettersRegex = /[^a-zA-Z]/;

    if (fieldName === "countryName") {
      if (countryName.trim().length < 3) {
        error = "Country Name must be at least 3 characters long";
      } else if (onlyLettersRegex.test(countryName)) {
        error = "Country Name must contain only letters";
      }
    }
    if (fieldName === "population") {
      if (+population < 1000) {
        error = "Population must be at least 1000 citizen";
      }
    }
    if (fieldName === "capitalCity") {
      if (capitalCity.trim().length < 3) {
        error = "Capital City must be at least 3 characters long";
      } else if (onlyLettersRegex.test(capitalCity)) {
        error = "Capital City must contain only letters";
      }
    }
    if (fieldName === "area") {
      if (+area < 100) {
        error = "Area must be at least 100 km² ";
      }
    }

    if (fieldName === "currency") {
      if (onlyLettersRegex.test(currency)) {
        error = "Currency must contain only letters";
      }
    }
    if (fieldName === "flagURL") {
      if (!flagURL.startsWith("http")) {
        error = "Please enter valid URL address";
      }
    }
    setCardFormErrorState((prevCardFormErrorState) => {
      return { ...prevCardFormErrorState, [`${fieldName}Error`]: error };
    });
  };
  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = event.target;
    validateInput(name);
  };
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setCardFormErrorState((prevCardFormErrorState) => {
      return { ...prevCardFormErrorState, [`${name}Error`]: "" };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (Object.values(cardFormErrorState).every((value) => value === "")) {
      onSubmit(event, cardFormstate);
      setCardFormState(formInitialObj);
      setCardFormErrorState(formErrorInitialMsg);
    } else {
      event.preventDefault();
    }
  };
  return (
    <form className={styles.country_form} onSubmit={handleSubmit}>
      <div>
        <div>
          <>
            <div>
              <label htmlFor="country-name">Country Name</label>
              <input
                value={countryName}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="text"
                name="countryName"
                id="country-name"
                placeholder="Georgia"
                required
              />
            </div>
            <p className={styles.input_error_msg}>{countryNameError}</p>
          </>
          <>
            <div>
              <label htmlFor="country-population">Population</label>
              <input
                value={population}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="number"
                name="population"
                id="country-population"
                placeholder="3 688 000"
                required
              />
            </div>
            <p className={styles.input_error_msg}>{populationError}</p>
          </>
          <>
            <div>
              <label htmlFor="capital-city">Capital City</label>
              <input
                value={capitalCity}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="text"
                name="capitalCity"
                id="capital-city"
                placeholder="Tbilisi"
                required
              />
            </div>
            <p className={styles.input_error_msg}>{capitalCityError}</p>
          </>
        </div>
        <div>
          <>
            <div>
              <label htmlFor="country-area">Country Area km²</label>
              <input
                value={area}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="number"
                name="area"
                id="country-area"
                placeholder="69 700"
                required
              />
            </div>
            <p className={styles.input_error_msg}>{areaError}</p>
          </>
          <>
            <div>
              <label htmlFor="country-currency">Currency</label>
              <input
                value={currency}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="text"
                name="currency"
                id="country-currency"
                placeholder="Gel"
                required
              />
            </div>
            <p className={styles.input_error_msg}>{currencyError}</p>
          </>
          <>
            <div>
              <label htmlFor="country-flag-url">Flag URL</label>
              <input
                value={flagURL}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="url"
                name="flagURL"
                id="country-flag-url"
                placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/1200px-Flag_of_Georgia.svg.png?20231228212034"
              />
            </div>
            <p className={styles.input_error_msg}>{flagURLError}</p>
          </>
        </div>
      </div>
      <button type="submit" title="Create New Destination">
        Create Destination
      </button>
    </form>
  );
};

export default CreateCardForm;
