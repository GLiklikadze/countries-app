import { CountryInterface } from "@/types/types";
import { axiosHttpClient } from "../http";

export const getDestinationDetails = async (id: string) => {
  try {
    const { data, status } = await axiosHttpClient.get<CountryInterface>(
      `/countries/${id}`,
    );
    console.log(status);
    return data;
  } catch (error) {
    console.error("Error fetching destination details", error);
    throw Error("Error fetching destination details");
  }
};
