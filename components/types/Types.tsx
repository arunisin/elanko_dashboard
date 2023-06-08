import { ReactNode } from "react";

export interface HelmetProps {
  title: string;
  children: ReactNode;
}

export interface RawDataProps {
  ConsumedQuantity: string;
  Cost: string;
  Date: string;
  InstanceId: string;
  MeterCategory: string;
  ResourceGroup: string;
  ResourceLocation: string;
  Tags: {
    "app-name": string;
    environment: string;
    "business-unit": string;
  };
  UnitOfMeasure: string;
  Location: string;
  ServiceName: string;
}
