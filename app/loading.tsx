import React from "react";
import "@components/styles/loading.css"; // Create and import your custom CSS for the skeleton screen here

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  const tmp = ["-", "-", "-", "-", "-", "-"];
  return (
    <div className="skeleton">
      <div className="skeleton__header"></div>
      <div className="skeleton__body">
        {tmp.map((_, index) => (
          <div key={index}>
            <Skeleton width={70} />
            <Skeleton count={3} />
            <div className="skeleton__cell"></div>
            <div className="skeleton__cell"></div>
            <div className="skeleton__cell"></div>
            <div className="skeleton__cell"></div>
            <div className="skeleton__cell"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
