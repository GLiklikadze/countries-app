import europeLogo from "@/assets/euro-logo-2.png";
import styles from "@/components/Header/Header.module.css";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Link,
  NavLink,
  NavLinkRenderProps,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const location = useLocation();

  const handleToggleLanguage = () => {
    const newLang = lang === "en" ? "ka" : "en";
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
    navigate(newPath);
  };

  function handleActiveNav(props: NavLinkRenderProps) {
    const { isActive } = props;

    if (isActive) {
      return styles.active_nav_link;
    } else {
      return styles.nav_link;
    }
  }
  const navDestinations = lang === "en" ? "Destinations" : "მიმართულებები";
  const navExperiences = lang === "en" ? "Experiences" : "გამოცდილებები";
  const navContact = lang === "en" ? "Contact" : "კონტაქტი";
  const navAbout = lang === "en" ? "About" : "ჩვენს შესახებ";
  const buttonLabel = lang === "en" ? "en" : "ქარ";

  return (
    <header
      className={`${styles.header} ${lang === "ka" ? styles.lang_ka : ""}`}
    >
      <Link className={styles.header_title_container} to="/">
        <img
          src={europeLogo}
          className={styles.title_logo}
          alt="europe-logo-img"
        />
        <h1>Europe Travel</h1>
      </Link>
      <nav className={styles.header_navbar_container}>
        <ul className={styles.header_navbar_box}>
          <li>
            <NavLink className={handleActiveNav} to="destinations">
              {navDestinations}
            </NavLink>
          </li>

          <li>
            <NavLink className={handleActiveNav} to="experiences">
              {navExperiences}
            </NavLink>
          </li>
          <li>
            <NavLink className={handleActiveNav} to="contact">
              {navContact}
            </NavLink>
          </li>
          <li>
            <NavLink className={handleActiveNav} to="about">
              {navAbout}
            </NavLink>
          </li>
        </ul>
      </nav>
      <button onClick={handleToggleLanguage}>
        <FontAwesomeIcon icon={faGlobe} />
        <span>{buttonLabel}</span>
      </button>
    </header>
  );
};

export default Header;
