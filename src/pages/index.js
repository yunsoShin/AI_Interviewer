import React from "react";
import UploadPDF from "../components/uploadpdf";
import CardSwiper from "../components/cardswiper";
import LoginButton from "@/components/loginbutton";
function index() {
  return (
    <div>
      <UploadPDF></UploadPDF>
      <CardSwiper></CardSwiper>
      <LoginButton></LoginButton>
    </div>
  );
}

export default index;
