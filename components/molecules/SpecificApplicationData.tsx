"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  SpecificApplicationDataFetch,
  Params,
} from "@app/api/applications/[application]/route";
import { RawDataProps } from "@components/types/Types";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
  ExpandedState,
} from "@tanstack/react-table";
import { useRouter } from "next/router";
import Loading from "@app/loading";

interface ApplicationrequestProps {
  application: string;
}

const SpecificApplicationData: React.FC<ApplicationrequestProps> = ({
  application,
}) => {
  const [data, setData] = useState<RawDataProps[]>([]);
  const [isDataLoaded, setisdataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await SpecificApplicationDataFetch({
          params: { application },
        });
        setisdataLoaded(true);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [application]);

  const columns = useMemo<ColumnDef<RawDataProps>[]>(
    () => [
      {
        header: "Consumed Quantity",
        accessorKey: "ConsumedQuantity",
      },
      { header: "Cost", accessorKey: "Cost" },
      {
        header: "Date",
        accessorKey: "Date",
      },
      {
        header: "Instance ID",
        accessorKey: "InstanceId",
      },
      { header: "Categoy", accessorKey: "MeterCategory" },
    ],

    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      {isDataLoaded ? (
        <>
          <h2 style={{ textAlign: "center", marginTop: "40px" }}>
            Data for {application}
          </h2>
          <div className="table-container">
            <table className=" table text-center">
              <thead>
                {table.getHeaderGroups().map((headerGroups) => (
                  <tr key={headerGroups.id}>
                    {headerGroups.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SpecificApplicationData;
