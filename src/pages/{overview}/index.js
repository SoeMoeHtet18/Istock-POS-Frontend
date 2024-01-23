import { useLocation } from "react-router-dom";
import NavBar from "../../components/layout/navBar";
import SideBar from "../../components/layout/sideBar";
import { useEffect } from "react";
import FilterBox from "../../components/common/filters/FilterBox";
import MainContent from "../../components/layout/mainContent";
import ShopContent from "../../components/contents/shopContent";

function Main() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const shopTabs = [
    {
      title: "Overview",
      slug: "overview",
      content: <ShopContent />,
    },
    {
      title: "Test",
      slug: "test",
      content: <div>This is Testing</div>,
    },
  ];

  return (
    <main>
      <div className="flex h-screen">
        <SideBar />
        <div className="flex flex-col pr-5" style={{ width: "87vw" }}>
          <NavBar />
          <FilterBox />
          <MainContent tabs={shopTabs} />
        </div>
      </div>
    </main>
  );
}

export default Main;
