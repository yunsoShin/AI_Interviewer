import React from "react";
import UploadPDF from "../components/uploadpdf";
import Navbar from "@/components/navbar";

function index() {
  return (
    <div className="">
      <Navbar></Navbar>
      <UploadPDF></UploadPDF>
    </div>
  );
}

export default index;
