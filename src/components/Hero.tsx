import trainIMG from "../assets/train-bridge.jpg";
import countryData from "../data/country-data.tsx";
import Card from "./Card.tsx";
import { CountryInterface } from "../types/types.ts";

function Hero() {
  return (
    <section className="hero-section">
      <img
        src={trainIMG}
        className="hero-background-img"
        alt="swiss-train-bridge"
      />
      <div className="hero-section-info">
        <h2 className="hero-section-heading">
          Discover the World’s Hidden Gems
        </h2>
        <p>
          Explore breathtaking landscapes, rich cultures, and unforgettable
          experiences. Your next adventure starts here.
        </p>
      </div>

      <div className="country-info">
        {countryData.map((country: CountryInterface) => (
          <Card country={country} key={country.id} />
        ))}
      </div>
    </section>
  );
}

export default Hero;
