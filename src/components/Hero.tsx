import trainIMG from "../assets/train-bridge.jpg";
import countryData from "../data/country-data.tsx";

interface CountryInterface {
  id: number;
  countryName: string;
  flagURL: string;
  population: number;
  capitalCity: string;
  area: string;
  topAttractions: string[];
  currency: string;
}

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
          <div className="card" key={country.id}>
            <h1>{country.countryName}</h1>
            <img src={country.flagURL} alt={`${country.countryName}-flag`} />
            <p>Population: {country.population}</p>
            <p>Capital City: {country.capitalCity}</p>
            <p>Area: {country.area} km²</p>
            <p>
              Top Attractions:&nbsp;
              {country.topAttractions.map((item, id) => (
                <span key={id}>{`${item},`}</span>
              ))}
            </p>
            <p>Currency: {country.currency}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
