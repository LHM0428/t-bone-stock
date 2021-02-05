import React from "react";
import Sector_Info from "./Sector_Info";
import Sector from "./Sector";

const Sector_Button = ({buttonName}) => {
    return (
        <button 
        class="border border-black p-3 font-bold text-gray-700
                hover:bg-black hover:text-white
                mt-2">
        {buttonName}
        </button>
    );
}

const Sector_Frame = () => {    
    return(
        <div class="">
            <Sector_Info />
            <Sector_Button buttonName="업종 펼치기 >"/>
            <Sector />
        </div>
    );
};

export default Sector_Frame;