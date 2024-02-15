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
    },
    {
      title: "Supplier",
      slug: "supplier",
    },
    {
      title: "Location",
      slug: "location",
    },
    {
      title: "Township",
      slug: "township",
    },
    {
      title: "User Rights",
      slug: "user_rights",
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
