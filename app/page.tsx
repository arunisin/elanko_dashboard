"use client";

import React, { useEffect, useState } from "react";
import { Rawdata, fetchDataAndConvert } from "./api/Raw";
import { RawDataProps } from "@components/types/Types";
import MainTable from "@components/molecules/MainTable";
import SpecificApplicationData from "@components/molecules/SpecificApplicationData";

const Page = () => {
  return (
    <>
      <div>
        <MainTable />
        {/* <SpecificApplicationData application="Macao" /> */}
      </div>
    </>
  );
};

export default Page;
