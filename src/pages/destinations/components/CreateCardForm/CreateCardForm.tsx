import { CreateCardFormProps } from "@/types/types";
import styles from "./CreateCardForm.module.css";
import { ChangeEvent, FocusEvent, FormEvent, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  formErrorInitialMsg,
  formInitialObj,
  inputToggleInitialObj,
} from "./initialStates";
import { validateInput } from "./validateFormInputs";
import useLabelsAndMessages from "./useLabelsAndMessages";
import OtpInput, { OtpInputRef } from "./OtpInput";

const CreateCardForm: React.FC<CreateCardFormProps> = ({
  onSubmit,
  cardFormState,
  setCardFormState,
  isEditingCard,
  handleEditClick,
}) => {
  const [cardFormErrorState, setCardFormErrorState] =
    useState(formErrorInitialMsg);

  const [inputsToggleState, setInputsToggleState] = useState(
    inputToggleInitialObj,
  );
  const [toggleVerificationCode, setToggleVerificationCode] = useState<{
    toggleCodeInput: boolean;
    isVerified: boolean;
    errorText: boolean;
  }>({
    toggleCodeInput: true,
    isVerified: false,
    errorText: false,
  });

  const inputRefs = useRef<OtpInputRef | null>(null);

  const verifyCode = 1234;

  const {
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
    verifyLabel,
    verifyButtonText,
    verifyCodeSendText,
    verifyConfirmText,
    verifyErrorText,
    destinationEdit,
  } = useLabelsAndMessages();

  const { lang } = useParams();
  const {
    countryName,
    countryNameKa,
    population,
    capitalCity,
    capitalCityKa,
    area,
    currency,
    currencyKa,
    id,
  } = cardFormState;

  const {
    countryNameError,
    countryNameKaError,
    populationError,
    capitalCityError,
    capitalCityKaError,
    areaError,
    currencyError,
    currencyKaError,
    flagURLError,
  } = cardFormErrorState;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (files && files.length > 0) {
      const file = files[0];

      if (file.type === "image/jpeg" || file.type === "image/png") {
        setCardFormErrorState((prevCardFormErrorState) => ({
          ...prevCardFormErrorState,
          flagURLError: "",
        }));
        const reader = new FileReader();

        reader.onloadend = () => {
          setCardFormState((prevCardFormState) => ({
            ...prevCardFormState,
            flagURL: reader.result as string,
          }));
        };

        reader.readAsDataURL(file);
      } else {
        setCardFormErrorState((prevCardFormErrorState) => ({
          ...prevCardFormErrorState,
          flagURLError: flagUploadError,
        }));
        console.error("File must be a JPG or PNG image.");
      }
    } else {
      setCardFormState((prevCardFormState) => {
        return { ...prevCardFormState, [name]: value };
      });
    }
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = event.target;
    validateInput(name, cardFormState, setCardFormErrorState, lang ?? "ka");
  };
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setCardFormErrorState((prevCardFormErrorState) => {
      return { ...prevCardFormErrorState, [`${name}Error`]: "" };
    });
  };

  const handleCodeCheck = () => {
    if (inputRefs.current) {
      const enteredCode = Object.values(inputRefs?.current?.inputRefs.current)
        .map((input) => input?.value)
        .join("");
      if (Number(enteredCode) === verifyCode) {
        setToggleVerificationCode((prevToggle) => ({
          ...prevToggle,
          isVerified: !prevToggle.isVerified,
        }));
      } else {
        setToggleVerificationCode((prevToggle) => ({
          ...prevToggle,
          errorText: true,
        }));
      }
    }
  };
  const handleVerificationToggle = () => {
    if (toggleVerificationCode.toggleCodeInput) {
      setToggleVerificationCode((prevToggle) => ({
        ...prevToggle,
        toggleCodeInput: !prevToggle.toggleCodeInput,
      }));
    }
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (countryName.length < 1) {
      event.preventDefault();
      setCardFormErrorState((prevErrors) => ({
        ...prevErrors,
        countryNameError: "Please fill Country Name",
      }));
    } else if (capitalCity.length < 1) {
      event.preventDefault();
      setCardFormErrorState((prevErrors) => ({
        ...prevErrors,
        capitalCityError: "Please fill Capital City",
      }));
    } else if (currency.length < 1) {
      event.preventDefault();
      setCardFormErrorState((prevErrors) => ({
        ...prevErrors,
        currencyError: "Please fill Currency",
      }));
    } else if (
      Object.values(cardFormErrorState).every((value) => value === "") &&
      toggleVerificationCode.isVerified
    ) {
      onSubmit(event, cardFormState);
      setCardFormState(formInitialObj);
      setCardFormErrorState(formErrorInitialMsg);
      setToggleVerificationCode((prevToggle) => ({
        ...prevToggle,
        isVerified: !prevToggle.isVerified,
        toggleCodeInput: !prevToggle.toggleCodeInput,
      }));
    } else {
      event.preventDefault();
    }
  };
  const handleCountryLanguageToggle = () => {
    setInputsToggleState((prev) => ({
      ...prev,
      countryInput: !inputsToggleState.countryInput,
    }));
  };

  const handleCapitalCityLanguageToggle = () => {
    setInputsToggleState((prev) => ({
      ...prev,
      capitalCityInput: !inputsToggleState.capitalCityInput,
    }));
  };

  const handleCurrencyLanguageToggle = () => {
    setInputsToggleState((prev) => ({
      ...prev,
      currencyInput: !inputsToggleState.currencyInput,
    }));
  };

  let countryInputBox;
  let capitalCityInputBox;
  let currencyInputBox;
  let otpContainer;

  if (inputsToggleState.countryInput) {
    countryInputBox = (
      <div className={styles.input_box}>
        <label htmlFor="country-name">{countryLabel}</label>
        <input
          value={countryName}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          type="text"
          name="countryName"
          id="country-name"
          placeholder="Georgia"
          className={styles.card_form_input}
          required
        />
      </div>
    );
  } else {
    countryInputBox = (
      <div className={styles.input_box}>
        <label htmlFor="country-name-ka">{countryLabel}</label>
        <input
          value={countryNameKa}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          type="text"
          name="countryNameKa"
          id="country-name-ka"
          placeholder="საქართველო"
          className={styles.card_form_input}
        />
      </div>
    );
  }
  if (inputsToggleState.capitalCityInput) {
    capitalCityInputBox = (
      <div className={styles.input_box}>
        <label htmlFor="capital-city">{capitalCityLabel}</label>
        <input
          value={capitalCity}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          type="text"
          name="capitalCity"
          id="capital-city"
          className={styles.card_form_input}
          placeholder="Tbilisi"
          required
        />
      </div>
    );
  } else {
    capitalCityInputBox = (
      <div className={styles.input_box}>
        <label htmlFor="capital-city-ka">{capitalCityLabel}</label>
        <input
          value={capitalCityKa}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          type="text"
          name="capitalCityKa"
          id="capital-city-ka"
          className={styles.card_form_input}
          placeholder="თბილისი"
          required
        />
      </div>
    );
  }
  if (inputsToggleState.currencyInput) {
    currencyInputBox = (
      <div className={styles.input_box}>
        <label htmlFor="country-currency">{currencyLabel}</label>
        <input
          value={currency}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          type="text"
          name="currency"
          className={styles.card_form_input}
          id="country-currency"
          placeholder="Gel"
        />
      </div>
    );
  } else {
    currencyInputBox = (
      <div className={styles.input_box}>
        <label htmlFor="country-currency">{currencyLabel}</label>
        <input
          value={currencyKa}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          type="text"
          name="currencyKa"
          className={styles.card_form_input}
          id="country-currency"
          placeholder="ლარი"
        />
      </div>
    );
  }
  if (toggleVerificationCode.toggleCodeInput) {
    otpContainer = <p> {verifyCodeSendText} </p>;
  } else {
    otpContainer = (
      <div className={styles.otp_box}>
        {!toggleVerificationCode.isVerified ? (
          <>
            <p>{verifyLabel}</p>
            <OtpInput otpInputNum={4} ref={inputRefs} />
            <button type="button" onClick={handleCodeCheck}>
              {verifyButtonText}
            </button>
            <p className={styles.verify_error_text}>
              {!toggleVerificationCode.errorText ? "" : `${verifyErrorText}`}
            </p>
          </>
        ) : (
          <p>{verifyConfirmText}</p>
        )}
      </div>
    );
  }
  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <div className={styles.country_form_main}>
        <div className={styles.country_form_column}>
          <>
            <div className={styles.input_toggle_box}>
              <div
                className={
                  !inputsToggleState.countryInput
                    ? styles.active_toggle_box
                    : ""
                }
                onClick={handleCountryLanguageToggle}
              >
                {inputToggleButtonsTextGeo}
              </div>
              <div
                className={
                  inputsToggleState.countryInput ? styles.active_toggle_box : ""
                }
                onClick={handleCountryLanguageToggle}
              >
                {inputToggleButtonsTextEng}
              </div>
            </div>
            {countryInputBox}
            <p className={styles.input_error_msg}>{countryNameKaError}</p>
            <p className={styles.input_error_msg}>{countryNameError}</p>
          </>
          <>
            <div className={styles.input_box}>
              <label htmlFor="country-population">{populationLabel}</label>
              <input
                value={population}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="number"
                name="population"
                id="country-population"
                placeholder="3 688 000"
                className={styles.card_form_input}
                required
              />
            </div>
            <p className={styles.input_error_msg}>{populationError}</p>
          </>
        </div>
        <div className={styles.country_form_column}>
          <>
            <div className={styles.input_toggle_box}>
              <div
                className={
                  !inputsToggleState.capitalCityInput
                    ? styles.active_toggle_box
                    : ""
                }
                onClick={handleCapitalCityLanguageToggle}
              >
                {inputToggleButtonsTextGeo}
              </div>
              <div
                className={
                  inputsToggleState.capitalCityInput
                    ? styles.active_toggle_box
                    : ""
                }
                onClick={handleCapitalCityLanguageToggle}
              >
                {inputToggleButtonsTextEng}
              </div>
            </div>
            {capitalCityInputBox}
            <p className={styles.input_error_msg}>{capitalCityKaError}</p>
            <p className={styles.input_error_msg}>{capitalCityError}</p>
          </>
          <>
            <div className={styles.input_box}>
              <label htmlFor="country-area">{areaLabel}</label>
              <input
                value={area}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="number"
                name="area"
                id="country-area"
                className={styles.card_form_input}
                placeholder="69 700"
                required
              />
            </div>
            <p className={styles.input_error_msg}>{areaError}</p>
          </>
        </div>
        <div className={styles.country_form_column}>
          <>
            <div className={styles.input_toggle_box}>
              <div
                className={
                  !inputsToggleState.currencyInput
                    ? styles.active_toggle_box
                    : ""
                }
                onClick={handleCurrencyLanguageToggle}
              >
                {inputToggleButtonsTextGeo}
              </div>
              <div
                className={
                  inputsToggleState.currencyInput
                    ? styles.active_toggle_box
                    : ""
                }
                onClick={handleCurrencyLanguageToggle}
              >
                {inputToggleButtonsTextEng}
              </div>
            </div>
            {currencyInputBox}
            <p className={styles.input_error_msg}>{currencyKaError}</p>
            <p className={styles.input_error_msg}>{currencyError}</p>
          </>
          <>
            <div className={styles.input_box}>
              <label htmlFor="country-flag-url">{flagUrlLabel}</label>
              <input
                required
                type="file"
                name="imgInput"
                className={styles.card_file_input}
                onChange={handleChange}
              />
            </div>
            <p className={styles.input_error_msg}>{flagURLError}</p>
          </>
        </div>
      </div>
      <div className={styles.otp_container} onClick={handleVerificationToggle}>
        {otpContainer}
      </div>
      {!isEditingCard ? (
        <button type="submit" title="Create New Destination">
          {destinationCreateBtn}
        </button>
      ) : (
        <button
          type="button"
          onClick={(event) => handleEditClick(event, id)}
          title="Edit Destination"
        >
          {destinationEdit}
        </button>
      )}
    </form>
  );
};

export default CreateCardForm;
