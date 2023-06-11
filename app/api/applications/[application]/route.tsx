import { RawDataProps } from "@components/types/Types";
import axios, { AxiosRequestConfig } from "axios";

const settings: AxiosRequestConfig = {
  method: "GET",
};

export interface Params {
  application: string;
}

export const SpecificApplicationDataFetch = async ({
  params,
}: {
  params: Params;
}): Promise<RawDataProps[]> => {
  try {
    console.log(params);
    const response = await axios(
      `https://engineering-task.elancoapps.com/api/applications/${params.application}`,
      settings
    );
    const results = response.data;
    return results;
  } catch (err) {
    console.log("error ", err);
    return [];
  }
};
