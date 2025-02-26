import React from "react";
import style from "./Loading.module.css";
import { PulseLoader } from "react-spinners";

export default function Loading() {
  return (
    <>
      <div className="center h-svh">
        <PulseLoader
          className="center min-h-svh"
          color="#0aad0a"
          cssOverride={{}}
          loading
          margin={20}
          size={60}
          speedMultiplier={0.8}
        />
      </div>
    </>
  );
}
