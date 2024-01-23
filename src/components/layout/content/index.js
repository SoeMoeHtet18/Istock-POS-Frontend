import clsx from "clsx";
import Footer from "../footer";

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
                "hs-tab-active:bg-primary-100 hs-tab-active:border-b-transparent hs-tab-active:text-dark dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:text-white -mb-px py-3 px-10 inline-flex items-center gap-x-2 bg-gray-50 text-sm font-medium text-center border-2 text-gray-500 rounded-t-lg hover:text-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
                index === 0 && "active"
              )}
              id={slug}
              data-hs-tab={"#" + tab.title}
              aria-controls={slug}
              role="tab"
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
    <div className="border-2 border-t-0 bg-primary-100 p-2 h-full">
      {tabs.map((tab, index) => {
        return (
          <div
            id={tab.title}
            className={clsx(
              "border-2 h-4/5 relative z-20",
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

function Content({ tabs }) {
  return (
    <div id="content" className="w-[70vw] flex flex-col h-full">
      <NavTabs tabs={tabs} />
      <TabContents tabs={tabs} />
      <Footer />
    </div>
  );
}

export default Content;
