import clsx from "clsx";
import React from "react";
import "./index.css";
import { Link, Outlet, useLocation } from "react-router-dom";
export const MainContent = ({ tabs }) => {
  const path = useLocation().pathname;

  return (
    <div className="flex flex-col h-full px-5 py-2">
      <div className="border-b border-[#DBD9D9]">
        <nav className="flex">
          {tabs.map((tab, index) => {
            const slug = tab.slug;

            return (
              <Link
                to={tab.slug}
                key={slug}
                type="button"
                className={clsx(
                  "-mb-px inline-flex items-center justify-center gap-x-2 bg-gray-50 font-medium border-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:pointer-events-none text-xs py-2",
                  path === `/setup/${tab.slug}` &&
                    "bg-primary-100 border-b-transparent text-dark"
                )}
                role="tab"
                style={{ width: "120px" }}
              >
                {tab.title}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-2 border-t-0 p-2 flex-1">
        <div className={clsx("relative h-full")} role="tabpanel">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
