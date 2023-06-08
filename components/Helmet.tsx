"use client";
import { HelmetProps } from "@components/types/Types";

import React, { useEffect } from "react";

const Helmet = ({ title, children }: HelmetProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = title;
    }
  }, [title]);
  return <>{children}</>;
};

export default Helmet;
