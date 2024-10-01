import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <main className={styles["error_page_container"]}>
      <h1>An error occurred!</h1>
      <p>Could not find this page!</p>
      <br />
      <hr />
      <p>
        Go to <Link to="/">HomePage</Link>
      </p>
    </main>
  );
};

export default ErrorPage;
