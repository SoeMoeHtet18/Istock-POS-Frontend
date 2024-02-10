import clsx from "clsx";
import Footer from "../footer";

const NavTabs = ({ tabs }) => {
  return (
    <div className="border-b border-[#DBD9D9]">
      <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
        {tabs.map((tab, index) => {
          const slug = tab.slug;
          return (
            <button
              key={slug}
              type="button"
              className={clsx(
                "hs-tab-active:bg-primary-100 hs-tab-active:border-b-transparent hs-tab-active:text-dark dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:text-white -mb-px inline-flex items-center justify-center gap-x-2 bg-gray-50 font-medium border-2 text-gray-500 rounded-t-lg hover:text-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 text-xs py-3",
                index === 0 && "active"
              )}
              data-hs-tab={"#" + tab.slug}
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
    <div className="border-2 border-t-0 bg-primary-100 p-2 h-full">
      {tabs.map((tab, index) => {
        return (
          <div
            id={tab.slug}
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
