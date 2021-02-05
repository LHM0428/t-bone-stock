import React, { Component } from "react";
import tbonestockImg from "../images/T-bone-Stock.png";
import Body_Line from "./common/Body_Line";
import Header_Frame from "./header/Header_Frame";
import Search_Frame from "./search/Search_Frame";
import Sector_Frame from "./sector/Sector_Frame";

const App = () => {

  return(
    <>
      <div class="w-5/6 m-auto">
        <Header_Frame />
      </div>
      <Body_Line />
      <div class="w-5/6 m-auto">
        <Search_Frame />
      </div>
      <Body_Line />
      <div class="w-5/6 m-auto mt-10">
        <Sector_Frame />
      </div>

      <div class="tab-table">
      </div>

      <div class="footer">
      </div>
    </>
  );
};

export default App;
