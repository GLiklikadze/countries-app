import europeMap from "../assets/euro-logo-2.png";

function Header() {
  return (
    <header className="header">
      <div className="header-title-container">
        <img src={europeMap} className="title-logo" alt="europe-map-img" />
        <h1>Europe Travel</h1>
      </div>
      <nav className="header-navbar-container">
        <ul className="header-navbar-box">
          <li>Destinations</li>
          <li>Experiences</li>
          <li>Accomodation</li>
          <li>Planning</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
