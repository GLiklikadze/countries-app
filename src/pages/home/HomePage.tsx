import countryData from "@/data/country-data";
import { lazy } from "react";

const LazyCard = lazy(() => import("./components/Card/Card"));
const LazyCardHeader = lazy(() => import("./components/CardHeader/CardHeader"));
const LazyCardContent = lazy(
  () => import("./components/CardContent/CardContent")
);
const LazyCardFooter = lazy(() => import("./components/CardFooter/CardFooter"));

const LazyCardList = lazy(() => import("./components/CardList/CardList"));
const LazyHero = lazy(() => import("./components/Hero/Hero"));

const HomePage = () => {
  return (
    <>
      <LazyHero>
        <LazyCardList>
          {countryData.map((country) => (
            <LazyCard key={country.id}>
              <LazyCardHeader
                countryName={country.countryName}
                flagURL={country.flagURL}
              />
              <LazyCardContent
                population={country.population}
                capitalCity={country.capitalCity}
                area={country.area}
              />
              <LazyCardFooter
                topAttractions={country.topAttractions}
                currency={country.currency}
              />
            </LazyCard>
          ))}
        </LazyCardList>
      </LazyHero>
    </>
  );
};

export default HomePage;
