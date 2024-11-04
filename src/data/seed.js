import axios from "axios";

async function seedData() {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const countryData = response.data;

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
    }));

    for (const country of formattedData) {
      await axios.post("http://localhost:3000/countries", country);
    }
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
