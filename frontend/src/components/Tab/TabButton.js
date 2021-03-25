import React from "react";

const TabButton = ({ openTab, tabNumber, tabName, onClickTabButton }) => {
    let color = 'blue';
    return (
        <>
            <li className="text-center">
                <a className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === tabNumber
                      ? "text-white bg-" + color + "-600"
                      : "text-" + color + "-600 bg-white")
                    }
                    onClick={e => {
                        e.preventDefault();
                        onClickTabButton(tabNumber)
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist">
                    {tabName}
                </a>
            </li>
        </>
    )
}

export default TabButton;