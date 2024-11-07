import axios from "axios";

export const getRestCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations from rest countries", error);
    throw new Error("Failed to fetch from rest destinations");
  }
};

export default getRestCountries;
