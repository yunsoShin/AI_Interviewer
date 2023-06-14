import React from "react";
import Navbar from "@/components/navbar";
import MyBoxList from "@/components/myboxlist";
function mybox(props) {
  return (
    <div>
      <Navbar></Navbar>
      <MyBoxList></MyBoxList>
    </div>
  );
}

export default mybox;
