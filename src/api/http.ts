import axios, { CreateAxiosDefaults } from "axios";

const axiosConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
};
const axiosRestCountriesConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_SEED_URL,
};

export const axiosHttpClient = axios.create(axiosConfig);

export const restCountriesClient = axios.create(axiosRestCountriesConfig);
