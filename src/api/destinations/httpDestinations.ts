import { CountryInterface } from "@/types/types";
import { axiosHttpClient } from "../http";
import { AxiosResponse } from "axios";

export const getDestinations = async (): Promise<CountryInterface[]> => {
  try {
    const response: AxiosResponse<CountryInterface[]> =
      await axiosHttpClient.get("/countries");
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching destinations", error);
    throw new Error("Failed to fetch destinations");
  }
};

export const deleteDestination = async (
  id: string,
): Promise<Partial<CountryInterface>> => {
  try {
    const response: AxiosResponse<Partial<CountryInterface>> =
      await axiosHttpClient.delete(`/countries/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error Deleting destination", error);
    throw error;
  }
};

interface likeDestinationParams {
  id: string;
  payload: { likes: number };
}

export const likeDestination = async ({
  id,
  payload,
}: likeDestinationParams): Promise<Partial<CountryInterface>> => {
  try {
    const response: AxiosResponse<CountryInterface> =
      await axiosHttpClient.patch(`/countries/${id}`, payload);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error to Like destination", error);
    throw error;
  }
};

export const createDestination = async (
  newDestination: Partial<CountryInterface>,
): Promise<CountryInterface> => {
  try {
    const response: AxiosResponse<CountryInterface> =
      await axiosHttpClient.post("/countries", newDestination);
    return response.data;
  } catch (error) {
    console.error("Destination Creating error", error);
    throw new Error("Failed to create destination");
  }
};

interface editDestinationParams {
  id: string;
  updatedCountry: CountryInterface;
}
export const editDestination = async ({
  id,
  updatedCountry,
}: editDestinationParams): Promise<CountryInterface> => {
  try {
    const response: AxiosResponse<CountryInterface> = await axiosHttpClient.put(
      `/countries/${id}`,
      updatedCountry,
    );
    return response.data;
  } catch (error) {
    console.error("Destination Editing error", error);
    throw new Error("Failed to edit destination");
  }
};
