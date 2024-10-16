import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Contact.module.css";

const contactFormInitialObj = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};
const Contact: React.FC = () => {
  const [contactFormState, setContactFormState] = useState(
    contactFormInitialObj
  );
  const { firstName, lastName, email, message } = contactFormState;

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(contactFormState);
    setContactFormState(contactFormInitialObj);
  };
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContactFormState((prevContactFormState) => {
      return { ...prevContactFormState, [name]: value };
    });
  };
  return (
    <main className={styles["contact_page_container"]}>
      <h1>Contact Us</h1>
      <form className={styles.contact_form} onSubmit={handleContactSubmit}>
        <div className={styles.name_box}>
          <label htmlFor="firstName">First Name</label>
          <input
            value={firstName}
            onChange={handleChange}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John"
            required
          />
        </div>
        <div className={styles.name_box}>
          <label htmlFor="lastName">Last Name</label>
          <input
            value={lastName}
            onChange={handleChange}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Smith"
            required
          />
        </div>

        <div className={styles.name_box}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            placeholder="john_smith@gmail.com"
            required
          />
        </div>
        <label htmlFor="message">Message</label>
        <textarea
          value={message}
          onChange={handleChange}
          id="message"
          name="message"
          rows={4}
          placeholder="Write your message here..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Contact;
