"use client";

import React, { useEffect, useState } from "react";
import { Rawdata } from "./api/Raw";
import { RawDataProps } from "@components/types/Types";
import axios from "axios";
import Table from "@components/molecules/Table";

const Page = () => {
  const [data, setData] = useState<RawDataProps[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const results = await Rawdata();
      console.log(results);
      setData(results);
      setIsDataLoaded(true);
    };

    fetchData();
  }, []);

  return (
    <>
      {isDataLoaded && (
        <div>
          <Table data={data} />
        </div>
      )}
    </>
  );
};

export default Page;
