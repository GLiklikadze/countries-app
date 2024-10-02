import europeLogo from "@/assets/euro-logo-2.png";
import styles from "@/components/Header/Header.module.css";
import { Link, NavLink, NavLinkRenderProps } from "react-router-dom";

const Header: React.FC = () => {
  function handleActiveNav(props: NavLinkRenderProps) {
    const { isActive } = props;

    if (isActive) {
      return styles.active_nav_link;
    } else {
      return styles.nav_link;
    }
  }
  return (
    <header className={styles.header}>
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
            <NavLink className={handleActiveNav} to="/destinations">
              Destinations
            </NavLink>
          </li>

          <li>
            <NavLink className={handleActiveNav} to="/experiences">
              Experiences
            </NavLink>
          </li>
          <li>
            <NavLink className={handleActiveNav} to="/planning">
              Planning
            </NavLink>
          </li>
          <li>
            <NavLink className={handleActiveNav} to="/about">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
