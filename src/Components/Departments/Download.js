import React from "react";
import Folder from "./Folder";
import { PDFDownloadLink } from "@react-pdf/renderer";

function Download({ data }) {
  return (
    <>
      <PDFDownloadLink document={<Folder data={data} />} filename="FORM">
        {({ loading }) =>
          loading ? (
            <button>Loading Document...</button>
          ) : (
            <button>Click</button>
          )
        }
      </PDFDownloadLink>
    </>
  );
}

export default Download;
