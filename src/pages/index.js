import React from "react";
import UploadPDF from "../components/uploadpdf";

import LoginButton from "@/components/loginbutton";
function index() {
  return (
    <div>
      <UploadPDF></UploadPDF>

      <LoginButton></LoginButton>
    </div>
  );
}

export default index;
