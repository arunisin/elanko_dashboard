import { RawDataProps } from "@components/types/Types";
import axios, { AxiosRequestConfig } from "axios";

const settings: AxiosRequestConfig = {
  method: "GET",
};

export const Applications = async (): Promise<RawDataProps[]> => {
  try {
    const response = await axios(
      `https://engineering-task.elancoapps.com/api/applications`,
      settings
    );
    const results = response.data;
    return results;
  } catch (err) {
    console.log("error ", err);
    return [];
  }
};
