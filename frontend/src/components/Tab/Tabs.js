import React, { useState } from "react";
import TabButton from "./TabButton";
import TabContent from "./TabContent";

const Tabs = ({ color, tabList }) => {
    const [openTab, setOpenTab] = useState(1);
    const onClickTabButton= (index) => {
        setOpenTab(index);
    }  
    

    return (
    <>
        <div className="flex flex-wrap">
            <div className="w-1/2 mx-auto">
                <ul className="flex mb-0 list-none flex-wrap pt-3 flex-row" role="tablist">
                    {tabList.map(({tabName}, index) => 
                        <TabButton
                            key={index}
                            color={color}
                            openTab={openTab}
                            tabNumber={index}
                            tabName={tabName}
                            onClickTabButton={onClickTabButton}
                            />
                    )}
                </ul>
            <div className="w-1/2 relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-lg rounded">
                <div className="flex-auto">
                    <div className="tab-content tab-space">
                        {tabList.map(({ContentCompnent}, index) => 
                            <TabContent
                                key={index}
                                openTab={openTab}
                                tabNumber={index}
                                ContentCompnent={ContentCompnent}
                            />
                        )}
                    </div>
                </div>
            </div>
            </div>
        </div>
    </>
  );
};

export default Tabs;