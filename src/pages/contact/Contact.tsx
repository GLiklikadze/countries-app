import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import styles from "./Contact.module.css";

const contactFormInitialObj = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};
const contactFormInitialMsg = {
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  messageError: "",
};
const Contact: React.FC = () => {
  const [contactFormState, setContactFormState] = useState(
    contactFormInitialObj
  );
  const [contactFormErrorState, setContactFormErrorState] = useState(
    contactFormInitialMsg
  );
  console.log(contactFormErrorState);
  const { firstName, lastName, email, message } = contactFormState;

  const { firstNameError, lastNameError, emailError, messageError } =
    contactFormErrorState;

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      firstNameError === "" &&
      lastNameError === "" &&
      emailError === "" &&
      messageError === ""
    ) {
      console.log(contactFormState);
      setContactFormState(contactFormInitialObj);
      setContactFormErrorState(contactFormInitialMsg);
    }
  };
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContactFormState((prevContactFormState) => {
      return { ...prevContactFormState, [name]: value };
    });
  };
  const validateInput = (fieldName: string) => {
    let error = "";
    const onlyLettersRegex = /[^a-zA-Z]/;
    const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (fieldName === "firstName") {
      if (firstName.trim().length < 3) {
        error = "First Name must be at least 3 characters long";
      } else if (onlyLettersRegex.test(firstName)) {
        error = "First Name must contain only letters";
      }
    }
    if (fieldName === "lastName") {
      if (lastName.trim().length < 3) {
        error = "Last Name must be at least 3 characters long";
      } else if (onlyLettersRegex.test(lastName)) {
        error = "Last Name must contain only letters";
      }
    }
    if (fieldName === "email") {
      if (!validEmailRegex.test(email)) {
        error = "Please enter valid email address";
      }
    }
    if (fieldName === "message") {
      if (message.trim().length < 10) {
        console.log("yes");
        error = "Message must be at least 10 characters long";
      }
    }

    setContactFormErrorState((prevContactFormErrorState) => {
      return { ...prevContactFormErrorState, [`${fieldName}Error`]: error };
    });
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = event.target;
    validateInput(name);
  };

  return (
    <main className={styles["contact_page_container"]}>
      <h1>Contact Us</h1>
      <form className={styles.contact_form} onSubmit={handleContactSubmit}>
        <>
          <div className={styles.name_box}>
            <label htmlFor="firstName">First Name</label>
            <input
              value={firstName}
              onChange={handleChange}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              onBlur={handleBlur}
              required
            />
          </div>
          <p className={styles.input_error_msg}>{firstNameError}</p>
        </>
        <>
          <div className={styles.name_box}>
            <label htmlFor="lastName">Last Name</label>
            <input
              value={lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Smith"
              required
            />
          </div>
          <p className={styles.input_error_msg}>{lastNameError}</p>
        </>
        <>
          <div className={styles.name_box}>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              id="email"
              name="email"
              placeholder="john_smith@gmail.com"
              required
            />
          </div>
          <p className={styles.input_error_msg}>{emailError}</p>
        </>
        <>
          <label htmlFor="message">Message</label>
          <textarea
            value={message}
            onChange={handleChange}
            onBlur={handleBlur}
            id="message"
            name="message"
            rows={4}
            placeholder="Write your message here..."
            required
          />
          <p className={styles.input_error_msg}>{messageError}</p>
        </>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Contact;
