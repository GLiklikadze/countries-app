import axios from "axios";
// import fs from "fs";

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
      imgUrl: [],
      likes: 0,
      isDeleted: false,
    }));

    for (const country of formattedData) {
      await axios.post("http://localhost:3000/countries", country);
    }
    console.log("Data successfully updated");
    // const readData = fs.readFileSync("database.json", "utf-8");
    // const database = JSON.parse(readData);
    // database.countries = formattedData;
    // fs.writeFileSync("database.json", JSON.stringify(database, null, 2));
  } catch (error) {
    console.error("Error fetching data", error);
  }
}
seedData();
