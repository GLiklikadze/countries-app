import { CountryInterface } from "@/types/types";
import { axiosHttpClient } from "../http";

export const getDestinationDetails = async (id: string) => {
  try {
    const { data } = await axiosHttpClient.get<CountryInterface>(
      `/countries/${id}`,
    );
    return data;
  } catch (error) {
    console.error("Error fetching destination details", error);
    throw Error("Error fetching destination details");
  }
};
