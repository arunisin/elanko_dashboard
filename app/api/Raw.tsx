import { RawDataProps } from "@components/types/Types";
import axios, { AxiosRequestConfig } from "axios";

const settings: any = {
  method: "GET",
};

export const Rawdata = async (): Promise<RawDataProps[]> => {
  try {
    const response = await axios(
      "https://engineering-task.elancoapps.com/api/raw",
      settings
    );
    const results = response.data;
    return results;
  } catch (err) {
    console.log("error ", err);
    return [];
  }
};
