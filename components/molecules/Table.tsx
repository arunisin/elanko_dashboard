import { RawDataProps } from "@components/types/Types";
import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

//  {
//         "ConsumedQuantity": "24",
//         "Cost": "21.5424",
//         "Date": "09/11/2020",
//         "InstanceId": "LA-f9c2ab0f-e037-4b5a-9fb9-3452e9c325b9",
//         "MeterCategory": "Logic Apps",
//         "ResourceGroup": "Macao",
//         "ResourceLocation": "EastUS",
//         "Tags": {
//             "app-name": "Macao",
//             "environment": "Development",
//             "business-unit": "SolutionOps"
//         },
//         "UnitOfMeasure": "1 Hour",
//         "Location": "US East",
//         "ServiceName": "Logic Apps"
//     }
const Table: React.FC<{ data: RawDataProps[] }> = ({ data }) => {
  console.log(data);
  const columns = useMemo<any>(
    () => [
      {
        accessorKey: "ConsumedQuantity",
        Header: "Consumed Quantity",
        size: 150,
        sortable: true,
      },
      { accessorKey: "Cost", Header: "Cost", size: 150, filterFn: "between" },
      { accessorKey: "Date", Header: "Date", size: 150 },
      { accessorKey: "MeterCategory", Header: "Meter Category", size: 150 },
      { accessorKey: "ResourceGroup", Header: "Resource Group", size: 150 },
      { accessorKey: "Location", Header: "Location", size: 100 },
      { accessorKey: "ServiceName", Header: "Service Name", size: 100 },
    ],
    []
  );

  return (
    <MaterialReactTable
      renderDetailPanel={({ row }) => (
        <div>
          instance Id: {row.original.InstanceId} <br /> units of measure:
          {row.original.UnitOfMeasure}
        </div>
      )}
      columns={columns}
      data={data}
    />
  );
};

export default Table;
