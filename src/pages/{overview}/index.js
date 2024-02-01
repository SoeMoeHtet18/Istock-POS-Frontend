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

  const tabs = {
    sale: [
      {
        title: "Sale",
        slug: "sale",
        content: <ShopContent />,
      },
      {
        title: "Sale Order",
        slug: "sale_order",
        content: <div>This is Testing</div>,
      },

      {
        title: "Return In",
        slug: "return_in",
        content: <div>This is Testing</div>,
      },

      {
        title: "Delivery",
        slug: "delivery",
        content: <div>This is Testing</div>,
      },

      {
        title: "Stock Exchange",
        slug: "stock_exchange",
        content: <div>This is Testing</div>,
      },
    ],
  };

  return (
    <main>
      <div className="flex h-screen">
        <SideBar />
        <div className="flex flex-col pr-5" style={{ width: "87vw" }}>
          <NavBar />
          <FilterBox />
          <MainContent tabs={tabs.sale} />
        </div>
      </div>
    </main>
  );
}

export default Main;
