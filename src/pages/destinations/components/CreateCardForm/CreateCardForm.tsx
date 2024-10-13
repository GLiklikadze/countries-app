import { FormEvent } from "react";
import styles from "./CreateCardForm.module.css";

type CreateCardFormProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const CreateCardForm: React.FC<CreateCardFormProps> = ({ onSubmit }) => {
  return (
    <form className={styles.country_form} onSubmit={onSubmit}>
      <div>
        <div>
          <div>
            <label htmlFor="country-name">Country Name</label>
            <input type="text" name="countryName" id="country-name" required />
          </div>
          <div>
            <label htmlFor="country-population">Population</label>
            <input
              type="number"
              name="population"
              id="country-population"
              required
            />
          </div>
          <div>
            <label htmlFor="capital-city">Capital City</label>
            <input type="text" name="capitalCity" id="capital-city" required />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="country-area">Country Area km²</label>
            <input type="number" name="area" id="country-area" required />
          </div>
          <div>
            <label htmlFor="country-currency">Currency</label>
            <input type="text" name="currency" id="country-currency" required />
          </div>
          <div>
            <label htmlFor="country-url">Flag URL</label>
            <input type="url" name="flagURL" id="country-flag-url" />
          </div>
        </div>
      </div>
      <button>Create Destination</button>
    </form>
  );
};

export default CreateCardForm;
