import { CountryInterface } from "@/types/types";
import { axiosHttpClient } from "../http";

export const getDestinations = async (sortSearchParams: URLSearchParams) => {
  let sortParams = "";
  if (sortSearchParams.has("_sort")) {
    sortParams = `?${sortSearchParams.toString()}`;
  }
  try {
    const { data } = await axiosHttpClient.get<CountryInterface[]>(
      `/countries${sortParams}`,
    );
    return data;
  } catch (error) {
    console.error("Error fetching destinations", error);
    throw new Error("Failed to fetch destinations");
  }
};
export const deleteDestination = async (id: string) => {
  try {
    const response = await axiosHttpClient.delete<Partial<CountryInterface>>(
      `/countries/${id}`,
    );
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
}: likeDestinationParams) => {
  try {
    const response = await axiosHttpClient.patch<CountryInterface>(
      `/countries/${id}`,
      payload,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error to Like destination", error);
    throw error;
  }
};

export const createDestination = async (
  newDestination: Partial<CountryInterface>,
) => {
  try {
    const response = await axiosHttpClient.post<CountryInterface>(
      "/countries",
      newDestination,
    );
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
}: editDestinationParams) => {
  try {
    const response = await axiosHttpClient.put<CountryInterface>(
      `/countries/${id}`,
      updatedCountry,
    );
    return response.data;
  } catch (error) {
    console.error("Destination Editing error", error);
    throw new Error("Failed to edit destination");
  }
};
