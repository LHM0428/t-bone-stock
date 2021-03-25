import React from 'react'

function CompanyName({companyName}) {
    return(
        <div class="text-4xl font-bold">
            {companyName}
        </div>
    )
}
function Capitalization({capitalization}) {
    return(
        <div class="text-2xl pl-10 pt-2">
            {capitalization}
        </div>
    )
}
function Sector({sectors}) {
    return(
        sectors.map(sector => 
        <div class="font-bold text-xl">
            {sector}
        </div>)
    )
}

function CompanyInfo() {
    const sectors = ["IM", "반도체", "CE"];
    return (
        <div class="justify-center h-px100 flex mt-16 pl-16 pt-5">
            <div class="flex w-5/12">
                <CompanyName companyName={"삼성전자"} />
                <Capitalization capitalization={"493조 1,040억원"} />            
            </div>            
            <div class="w-5/12 pt-3 pl-40 flex justify-around ">
                <Sector sectors={sectors}/>
            </div>
        </div>
    )
}

export default CompanyInfo
