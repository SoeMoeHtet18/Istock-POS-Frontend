import React from "react";
import { AppBar } from "../../components/setup/layout/AppBar";
import { StockContent } from "../../components/setup/contents/StockContent";
import { MainContent } from "../../components/setup/layout/mainContent";

export const SetUp = () => {
  const tabs = [
    {
      title: "Stock",
      slug: "stock",
      content: <StockContent />,
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
  ];

  return (
    <div className="flex flex-col h-screen">
      <AppBar />
      <div className="flex-1">
        <MainContent tabs={tabs} />
      </div>
    </div>
  );
};
