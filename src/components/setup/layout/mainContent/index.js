import clsx from "clsx";
import React from "react";

const NavTabs = ({ tabs }) => {
  return (
    <div className="border-b border-[#DBD9D9]">
      <nav className="flex" aria-label="Tabs" role="tablist">
        {tabs.map((tab, index) => {
          const slug = tab.slug;
          return (
            <button
              key={slug}
              type="button"
              className={clsx(
                "hs-tab-active:bg-primary-100 hs-tab-active:border-b-transparent hs-tab-active:text-dark dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:text-white -mb-px inline-flex items-center justify-center gap-x-2 bg-gray-50 font-medium border-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 text-xs py-3",
                index === 0 && "active"
              )}
              id={slug}
              data-hs-tab={"#" + tab.title}
              aria-controls={slug}
              role="tab"
              style={{ width: "120px" }}
            >
              {tab.title}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

const TabContents = ({ tabs }) => {
  return (
    <div className="border-2 border-t-0 p-2 h-full">
      {tabs.map((tab, index) => {
        return (
          <div
            id={tab.title}
            className={clsx(
              "h-4/5 relative z-20",
              index === 0 ? "active" : "hidden"
            )}
            key={tab.slug}
            role="tabpanel"
            aria-labelledby={tab.slug}
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
};

export const MainContent = ({ tabs }) => {
  return (
    <div className="px-5 py-2">
      <NavTabs tabs={tabs} />
      <TabContents tabs={tabs} />
    </div>
  );
};
