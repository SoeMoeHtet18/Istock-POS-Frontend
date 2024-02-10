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
      title: "Supplier",
      slug: "supplier",
      content: <div>This is Testing</div>,
    },

    {
      title: "Customer",
      slug: "customer",
      content: <div>This is Testing</div>,
    },

    {
      title: "Delivery",
      slug: "delivery",
      content: <div>This is Testing</div>,
    },

    {
      title: "Location",
      slug: "location",
      content: <div>This is Testing</div>,
    },
    {
      title: "Township",
      slug: "township",
      content: <div>This is Testing</div>,
    },
    {
      title: "User Rights",
      slug: "user_rights",
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
