import Reeact from "react";
import Search from "./Search";
import Search_Info from "./Search_Info";

const Search_Frame = () => {
    return(
        <div class="flex space-x-1 h-80">
            <Search_Info />
            <Search />
        </div>
    );
};

export default Search_Frame;

