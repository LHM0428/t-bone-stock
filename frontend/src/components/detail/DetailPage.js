import React from "react";
import CompanyInfo from "./company/CompanyInfo";
import CompanyConsensus from "./company/CompanyConsensus";

function DetailPage() {
    return (
        <div class="w-5/6 m-auto felx">
           <CompanyInfo />
           <CompanyConsensus />
        </div>
    )
}

export default DetailPage