import { CreateCardFormProps } from "@/types/types";
import styles from "./CreateCardForm.module.css";

const CreateCardForm: React.FC<CreateCardFormProps> = ({ onSubmit }) => {
  return (
    <form className={styles.country_form} onSubmit={onSubmit}>
      <div>
        <div>
          <div>
            <label htmlFor="country-name">Country Name</label>
            <input
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
              type="url"
              name="flagURL"
              id="country-flag-url"
              placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/1200px-Flag_of_Georgia.svg.png?20231228212034"
            />
          </div>
        </div>
      </div>
      <button type="submit">Create Destination</button>
    </form>
  );
};

export default CreateCardForm;
