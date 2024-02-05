import React from "react";

export const Content = ({
  pageTitle,
  tableTitle,
  navBar,
  dataTable,
  dataLength,
}) => {
  return (
    <div className="flex h-full">
      <div className="flex flex-col">
        <div className="flex h-7h">
          <div className="flex flex-col h-full">
            <h2 className="text-md h-1/2h">{pageTitle}</h2>
            {navBar}
          </div>
          <div className="ms-1 h-full flex flex-col">
            <div className="h-1/2h"></div>
            <div className="w-5.8w border relative flex-1">
              <span className="top-letter">{tableTitle}</span>
              <div
                style={{ width: "98%", height: "95%", margin: "15px auto 0" }}
              >
                {dataTable}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="flex flex-col w-1.2w text-sm h-full relative">
            <span>Stock Count: {dataLength}</span>
            <button className="text-red-500 border w-min px-3">Brand</button>
            <div className="flex justify-between absolute w-full bottom-0">
              <div className="cursor-pointer">
                <span>F5: </span>
                <span className="text-primary-200">Confirm</span>
              </div>
              <div className="cursor-pointer">
                <span>F8: </span>
                <span className="text-primary-200">Delete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ms-1">
        <div className="h-1/2h"></div>
        <div className="w-2.5w border"></div>
      </div>
    </div>
  );
};
