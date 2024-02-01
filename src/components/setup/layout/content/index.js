import React from "react";

export const Content = ({ pageTitle, tableTitle, navBar, dataTable }) => {
  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className="flex h-7h">
          <div className="flex flex-col h-full">
            <h2 className="text-md h-1/2h">{pageTitle}</h2>
            {navBar}
          </div>
          <div className="ms-1 h-full flex flex-col">
            <div className="h-1/2h"></div>
            <div className="w-6w border relative flex-1">
              <span className="top-letter">{tableTitle}</span>
              <div
                style={{ width: "98%", height: "95%", margin: "15px auto 0" }}
              >
                {dataTable}
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="ms-1">
        <div className="h-1/2h"></div>
        <div className="w-2.5w border"></div>
      </div>
    </div>
  );
};
