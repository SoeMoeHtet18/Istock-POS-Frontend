import clsx from "clsx";
import React from "react";

export const Content = ({
  pageTitle,
  tableTitle,
  navBar,
  dataTable,
  dataLength,
  detail,
  bottomNavBtns,
  width,
  switchBtn,
}) => {
  return (
    <div className="flex h-full">
      <div className="flex flex-col">
        <div className="flex h-7h">
          <div className="flex flex-col h-full">
            <h2 className="text-md h-1/2h">{pageTitle}</h2>
            {navBar ?? ""}
          </div>
          <div className="ms-1 h-full flex flex-col">
            <div className="h-1/2h"></div>
            <div
              className={clsx(
                width ? width : "w-5.8w",
                "border relative flex-1"
              )}
            >
              <span className="top-letter">{tableTitle}</span>
              <div
                style={{ width: "98%", height: "95%", margin: "15px auto 0" }}
              >
                {dataTable ?? ""}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 text-sm">
          <div className="flex flex-col w-1.2w h-full relative">
            <span>
              {pageTitle} Count: {dataLength}
            </span>
            {switchBtn}
          </div>
          <div className="flex gap-x-8 absolute w-full bottom-0">
            {bottomNavBtns?.map((btn) => (
              <button
                key={btn.name}
                className="cursor-pointer flex gap-x-3"
                onClick={btn.onClick}
              >
                <span>{btn.key + ": "} </span>
                <span className="text-primary-200">{btn.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="ms-1">
        <div className="h-1/2h"></div>
        {detail}
      </div>
    </div>
  );
};
