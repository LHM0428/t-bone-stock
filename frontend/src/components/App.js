import React, { Component } from "react";
import tbonestockImg from "../images/T-bone-Stock.png";
import Body_Line from "./common/Body_Line";
import Header_Frame from "./header/Header_Frame";
import Search_Frame from "./search/Search_Frame";
import Sector_Frame from "./sector/Sector_Frame";

const App = () => {

  return(
    <>
      <Header_Frame />
      <Body_Line />
      <Search_Frame />
      <Body_Line />
      <Sector_Frame />

      <div class="tab-table">
      </div>

      <div class="footer">
      </div>
    </>
  );
};

export default App;
