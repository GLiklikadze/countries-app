import europeLogo from "@/assets/euro-logo-2.png";
import styles from "@/components/Header/Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_title_container}>
        <img
          src={europeLogo}
          className={styles.title_logo}
          alt="europe-logo-img"
        />
        <h1>Europe Travel</h1>
      </div>
      <nav className={styles.header_navbar_container}>
        <ul className={styles.header_navbar_box}>
          <li>Destinations</li>
          <li>Experiences</li>
          <li>Accomodation</li>
          <li>Planning</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
