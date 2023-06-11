import { createColumnHelper } from "@tanstack/react-table";
import format from "date-fns/format";

const columnHelper = createColumnHelper();

export const COLUMNS = [
  columnHelper.accessor("ResourceGroup", { header: "Resource Group" }),
  columnHelper.accessor("MeterCategory", { header: "Meter Category" }),
  columnHelper.accessor("ResourceLocation", { header: "Resource Location" }),
  columnHelper.accessor("ConsumedQuantity", {
    header: "Cumulative Quantity",
    disableFilters: true,
  }),
  columnHelper.accessor("Cost", {
    header: "Cumulative Cost",
    disableFilters: true,
  }),
  columnHelper.accessor("Date.from", {
    header: "From",
    Cell: ({ value }) => {
      return format(value, "dd/MM/yyyy");
    },
  }),
  columnHelper.accessor("Date.to", {
    header: "To",
    Cell: ({ value }) => {
      return format(value, "dd/MM/yyyy");
    },
  }),
];
