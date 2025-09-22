import React from "react";
import { Grid } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="fixed top-[64px] bottom-0 right-0 left-0 flex justify-center items-center bg-gray-900/50 z-50">
      <Grid
        visible={true}
        height="80"
        width="80"
        color="#0aad0a"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  );
}
