"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ApplicationSpecific = () => {
  const router = useRouter();
  console.log(router);
  return <></>;
};

export default ApplicationSpecific;
