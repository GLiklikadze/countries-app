import { CardFormStateObj, CreateCardFormProps } from "@/types/types";
import styles from "./CreateCardForm.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

const formInitialObj = {
  countryName: "",
  population: "",
  capitalCity: "",
  area: "",
  currency: "",
  flagURL: "",
};
const CreateCardForm: React.FC<CreateCardFormProps> = ({ onSubmit }) => {
  const [cardFormstate, setCardFormState] =
    useState<CardFormStateObj>(formInitialObj);
  const { countryName, population, capitalCity, area, currency, flagURL } =
    cardFormstate;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCardFormState((prevCardFormSate) => {
      return { ...prevCardFormSate, [name]: value };
    });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    onSubmit(event, cardFormstate);
  };
  return (
    <form className={styles.country_form} onSubmit={handleSubmit}>
      <div>
        <div>
          <div>
            <label htmlFor="country-name">Country Name</label>
            <input
              value={countryName}
              onChange={handleChange}
              type="text"
              name="countryName"
              id="country-name"
              placeholder="Georgia"
              required
            />
          </div>
          <div>
            <label htmlFor="country-population">Population</label>
            <input
              value={population}
              onChange={handleChange}
              type="number"
              name="population"
              id="country-population"
              placeholder="3 688 000"
              required
            />
          </div>
          <div>
            <label htmlFor="capital-city">Capital City</label>
            <input
              value={capitalCity}
              onChange={handleChange}
              type="text"
              name="capitalCity"
              id="capital-city"
              placeholder="Tbilisi"
              required
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="country-area">Country Area km²</label>
            <input
              value={area}
              onChange={handleChange}
              type="number"
              name="area"
              id="country-area"
              placeholder="69 700"
              required
            />
          </div>
          <div>
            <label htmlFor="country-currency">Currency</label>
            <input
              value={currency}
              onChange={handleChange}
              type="text"
              name="currency"
              id="country-currency"
              placeholder="Gel"
              required
            />
          </div>
          <div>
            <label htmlFor="country-flag-url">Flag URL</label>
            <input
              value={flagURL}
              onChange={handleChange}
              type="url"
              name="flagURL"
              id="country-flag-url"
              placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/1200px-Flag_of_Georgia.svg.png?20231228212034"
            />
          </div>
        </div>
      </div>
      <button type="submit" title="Create New Destination">
        Create Destination
      </button>
    </form>
  );
};

export default CreateCardForm;
