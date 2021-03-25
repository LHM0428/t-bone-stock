import React from "react";
import Search from "./Search";

function Header() {
    return(
        <div class="w-5/6 m-auto h-40 flex">
            <div class="w-1/6 ">
                티본스탁로고
            </div>
            <div class="w-4/6 pt-20 text-2xl">
                우리와 함께 가치투자를 실현하세요
            </div>    
            <div class="w-2/6 pt-20">
                <Search />
            </div>
        </div>
    )
}

export default Header