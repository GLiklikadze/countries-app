import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      message: event.target.message.value,
    };
    console.log(formData);
    event.target.reset();
  };
  return (
    <main className={styles["contact_page_container"]}>
      <h1>Contact Us</h1>
      <form className={styles.contact_form} onSubmit={handleContactSubmit}>
        <div className={styles.name_box}>
          <label htmlFor="firstName">First Name</label>
          <input
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
            type="email"
            id="email"
            name="email"
            placeholder="john_smith@gmail.com"
            required
          />
        </div>
        <label htmlFor="message">Message</label>
        <textarea
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
