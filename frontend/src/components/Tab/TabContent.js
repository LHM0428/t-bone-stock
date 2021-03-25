import React from "react";

const TabContent = ({ openTab, tabNumber, ContentCompnent }) => {
    return (
        <>
            <div className={openTab === tabNumber ? "block" : "hidden"} id={`tab-content-${tabNumber}`}>
                {tabNumber}
                <ContentCompnent/>
            </div>
        </>
    )
}

export default TabContent;