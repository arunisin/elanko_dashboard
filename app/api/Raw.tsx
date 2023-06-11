import { RawDataProps, ConvertedDataProps } from "@components/types/Types";
import axios, { AxiosRequestConfig } from "axios";
import format from "date-fns/format";

const settings: AxiosRequestConfig = {
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

const convertData = (data: RawDataProps[]) => {
  const convertedData = [];
  let currentGroup = null;
  let currentCategory = null;
  let cumulativeQuantity = 0;
  let cumulativeCost = 0;
  let fromDate = null;
  let toDate = null;

  for (const item of data) {
    if (
      item.ResourceGroup === currentGroup &&
      item.MeterCategory === currentCategory
    ) {
      cumulativeQuantity += parseInt(item.ConsumedQuantity);
      cumulativeCost += parseFloat(item.Cost);
      toDate = parseDate(item.Date);

      const parsedDate = parseDate(item.Date);
      if (!fromDate || parsedDate < fromDate) {
        fromDate = parsedDate;
      }
    } else {
      if (currentGroup !== null && currentCategory !== null) {
        const convertedItem = {
          ConsumedQuantity: cumulativeQuantity.toString(),
          Cost: cumulativeCost.toFixed(4),
          Date: { from: fromDate, to: toDate },
          MeterCategory: currentCategory,
          ResourceGroup: currentGroup,
          ResourceLocation: data[0].ResourceLocation,
        };
        convertedData.push(convertedItem);
      }
      currentGroup = item.ResourceGroup;
      currentCategory = item.MeterCategory;
      cumulativeQuantity = parseInt(item.ConsumedQuantity);
      cumulativeCost = parseFloat(item.Cost);
      fromDate = parseDate(item.Date);
      toDate = parseDate(item.Date);
    }
  }

  if (currentGroup !== null && currentCategory !== null) {
    const convertedItem = {
      ConsumedQuantity: cumulativeQuantity.toString(),
      Cost: cumulativeCost.toFixed(4),
      Date: { from: fromDate, to: toDate },
      MeterCategory: currentCategory,
      ResourceGroup: currentGroup,
      ResourceLocation: data[0].ResourceLocation,
    };
    convertedData.push(convertedItem);
  }

  return convertedData;
};

const parseDate = (dateString: string): string => {
  const parts = dateString.split("/");
  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);

  return format(new Date(year, month, day), "dd/MM/yyyy");
};

export const fetchDataAndConvert = async (): Promise<ConvertedDataProps[]> => {
  const rawData = await Rawdata();
  const convertedData = convertData(rawData);
  return convertedData;
};
