import React from "react";

const Search = () => {
    return (
        <div class="flex m-auto">
            <div class="flex w-px500 mt-3 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-900">
                <input type="text" 
                class="pl-3 w-11/12 py-3 bg-white text-gray-700 focus:border-gray-900 text-lg" 
                placeholder="검색" 
                />
                <svg class="w-7 text-gray-900 cursor-pointer" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
        </div>
    );
}

export default Search;