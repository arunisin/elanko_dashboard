"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  SpecificApplicationDataFetch,
  Params,
} from "@app/api/applications/SpecificApplication";
import { RawDataProps } from "@components/types/Types";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

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
    getPaginationRowModel: getPaginationRowModel(),
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

            
          </div><div
              style={{ display: "flex", gap: "25px", justifyContent: "center" }}
            >
              <div>
                <button
                  className="border rounded p-1"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<<"}
                </button>
                <button
                  className="border rounded p-1"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<"}
                </button>
                <button
                  className="border rounded p-1"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {">"}
                </button>
                <button
                  className="border rounded p-1"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  {">>"}
                </button>
              </div>
              <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <span className="flex items-center gap-1">
                | Go to page:
                <input
                  type="number"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="border p-1 rounded w-16"
                />
              </span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SpecificApplicationData;
