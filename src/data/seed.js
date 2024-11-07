import fs from "fs";
import getRestCountries from "../api/destinations/httpSeedDestinations.js";

async function seedData() {
  const countryData = await getRestCountries();
  const formattedData = countryData.map((country, id) => ({
    countryName: country.name.official || "Unknown",
    countryNameKa: country.name.official || "Unknown",
    flagURL: country.flags?.png || "",
    population: country.population || 0,
    capitalCity: country.capital ? country.capital[0] : "Unknown",
    capitalCityKa: country.capital ? country.capital[0] : "Unknown",
    area: country.area || 0,
    currency: Object.keys(country.currencies || {})[0] || "Unknown",
    currencyKa: Object.keys(country.currencies || {})[0] || "Unknown",
    likes: 0,
    id: id.toString(),
  }));
  try {
    fs.writeFileSync(
      "database.json",
      JSON.stringify({ countries: formattedData }, null, 2),
    );
    console.log("Data successfully updated");
  } catch (error) {
    if (error.response) {
      console.error(
        "Error response:",
        error.response.status,
        error.response.data,
      );
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error(error.message);
    }
  }
}
seedData();
