import React from "react";

const Info = ({msg}) => {
    return <div class="font-bold text-2xl mb-2">{msg}</div>
};

const Search_Info = () => {
    return(
        <div class="flex-auto m-auto">            
            <Info msg="T-Bone-Stock 과 함께" />
            <Info msg="가치투자를 이루어가세요." />
        </div>
    );
};

export default Search_Info;