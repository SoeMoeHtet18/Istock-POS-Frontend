import React from "react";
import { AppBar } from "../../components/setup/layout/AppBar";
import { StockContent } from "../../components/setup/contents/StockContent";
import { MainContent } from "../../components/setup/layout/mainContent";
import { LocationContent } from "../../components/setup/contents/LocationContent";
import { SupplierContent } from "../../components/setup/contents/SupplierContent";

export const SetUp = () => {
  const tabs = [
    {
      title: "Stock",
      slug: "stock",
      // content: <StockContent />,
    },
    {
      title: "Supplier",
      slug: "supplier",
      // content: <SupplierContent />,
    },

    {
      title: "Customer",
      slug: "customer",
      // content: <div>This is Testing</div>,
    },

    {
      title: "Location",
      slug: "location",
      // content: <LocationContent />,
    },
    {
      title: "Township",
      slug: "township",
      // content: <div>This is Testing</div>,
    },
    {
      title: "User Rights",
      slug: "user_rights",
      // content: <div>This is Testing</div>,
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
