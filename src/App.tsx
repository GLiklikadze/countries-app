import "./App.css";
import Card from "./components/Card/Card.tsx";
import CardContent from "./components/CardContent/CardContent.tsx";
import CardFooter from "./components/CardFooter/CardFooter.tsx";
import CardHeader from "./components/CardHeader/CardHeader.tsx";
import CardList from "./components/CardList/CardList.tsx";
import Hero from "./components/Hero/Hero.tsx";
import Layout from "./components/Layout/Layout.tsx";
import countryData from "./data/country-data.tsx";

function App() {
  return (
    <>
      <Layout>
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
      </Layout>
    </>
  );
}

export default App;
