import axios, { CreateAxiosDefaults } from "axios";

const axiosConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

export const axiosHttpClient = axios.create(axiosConfig);
