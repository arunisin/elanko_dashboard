import React, { Fragment, useEffect, useMemo, useState } from "react";
import { COLUMNS } from "@components/atoms/columns";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
  ExpandedState,
  getExpandedRowModel,
  Row,
} from "@tanstack/react-table";
import { fetchDataAndConvert } from "@app/api/Raw";
import { ConvertedDataProps, RawDataProps } from "@components/types/Types";
import { SpecificApplicationDataFetch } from "@app/api/applications/[application]/route";
import "@components/styles/global.css";
import "@components/styles/global.css";
import SpecificApplicationData from "./SpecificApplicationData";

import Filter from "@components/atoms/Filter";
import Loading from "@app/loading";
import Link from "next/link";

const MainTable = () => {
  const [data, setData] = useState<ConvertedDataProps[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isMainTable, setIsmainTable] = useState(true);
  const [selectedRowData, setSelectedRowData] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataAndConvert();
        setIsDataLoaded(true);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo<ColumnDef<ConvertedDataProps>[]>(
    () => [
      {
        id: "expander",
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
              }}
            >
              {row.getIsExpanded() ? "👇" : "👉"}
            </button>
          ) : (
            "🔵"
          );
        },
      },

      {
        header: "Resource Group",
        accessorKey: "ResourceGroup",
        cell: ({ row, getValue }) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setIsmainTable(false)}
          >
            {getValue<string>()}
          </div>
        ),
      },
      {
        header: "Meter Category",
        accessorKey: "MeterCategory",
        cell: (info) => info.getValue(),
      },
      {
        header: "Resouce Location",
        accessorKey: "ResourceLocation",
      },
      { header: "Consumed Quantity", accessorKey: "ConsumedQuantity" },
      {
        header: "Date",
        columns: [
          { accessorKey: "Date.from", header: "From" },
          { accessorKey: "Date.to", header: "to" },
        ],
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      {isDataLoaded ? (
        isMainTable ? (
          <>
            <h2 style={{ textAlign: "center" }}>
              The data is shown cumulatievly
            </h2>
            <div
              className="table-container"
              style={{ display: "flex", alignItems: "center" }}
            >
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
                              {header.column.getCanFilter() &&
                              header.index < 3 ? (
                                <div>
                                  <Filter
                                    column={header.column}
                                    table={table}
                                  />
                                </div>
                              ) : null}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => {
                        setSelectedRowData(row.original.ResourceGroup);
                      }}
                    >
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

            <div
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
          <>
            <button onClick={() => setIsmainTable(true)}>goBack</button>
            <SpecificApplicationData application={selectedRowData} />
          </>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MainTable;
