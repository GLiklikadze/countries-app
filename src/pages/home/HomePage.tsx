import countryData from "@/data/country-data";
import { Card } from "./components/Card";
import CardHeader from "./components/CardHeader/CardHeader";
import CardContent from "./components/CardContent/CardContent";
import CardFooter from "./components/CardFooter/CardFooter";
import CardList from "./components/CardList/CardList";
import Hero from "./components/Hero/Hero";

const HomePage = () => {
  return (
    <>
      <Hero>
        <CardList>
          {countryData.map((country) => (
            <Card key={country.id}>
              <CardHeader
                countryName={country.countryName}
                flagURL={country.flagURL}
              />
              <CardContent
                population={country.population}
                capitalCity={country.capitalCity}
                area={country.area}
              />
              <CardFooter
                topAttractions={country.topAttractions}
                currency={country.currency}
              />
            </Card>
          ))}
        </CardList>
      </Hero>
    </>
  );
};

export default HomePage;
