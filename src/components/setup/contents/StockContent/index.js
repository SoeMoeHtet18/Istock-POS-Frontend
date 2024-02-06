import React, { useEffect, useState } from "react";
import "./index.css";
import DataTable from "../../layout/table";
import { Content } from "../../layout/content";
import axios from "axios";
import StockTableInput from "../../tableInputs/StockTableInput";
import StockTableCell from "../../tableCells/StockTableCell";
import { useSelector } from "react-redux";
import { useGetAllStocksQuery } from "../../../../tools/api-services/stockApi";
import { StockNavBar } from "../../navBars/StockNavBar";
import { StockDetail } from "../../sideDetails/StockDetail";

export const StockContent = () => {
  const [dataLength, setDataLength] = useState(0);
  const [formData, setFormData] = useState({});
  const [category, setCategory] = useState({});

  const handleDataChange = (index) => {
    setDataLength((prevDataLength) =>
      prevDataLength === parseInt(index) ? prevDataLength + 1 : prevDataLength
    );
  };

  const theads = [
    { title: "Code", width: "14%" },
    { title: "Description", width: "20%" },
    { title: "Short", width: "10%" },
    { title: "Category", width: "10%" },
    { title: "PCurr", width: "8%" },
    { title: "PurPrice", width: "15%" },
    { title: "SCurr", width: "8%" },
    { title: "Sale Price", width: "15%" },
    { title: "GP", width: "5%" },
  ];

  const tRows = [];
  const {
    data,
    error,
    isLoading,
    refetch: refetchStocks,
  } = useGetAllStocksQuery();

  useEffect(() => {
    console.log("category ", category);
    console.log(formData);
  }, [formData, category]);

  while (tRows.length < 10) {
    tRows.push(
      <StockTableInput
        key={`row-${tRows.length}`}
        index={tRows.length}
        dataLength={dataLength}
        onDataLengthChange={handleDataChange}
        setFormData={setFormData}
        category={category}
      />
    );
  }

  const [rows, setRows] = useState(tRows);

  useEffect(() => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      if (dataLength < updatedRows.length) {
        // Update the specific row at the given index
        updatedRows[dataLength] = (
          <StockTableInput
            key={dataLength}
            index={dataLength}
            dataLength={dataLength}
            onDataLengthChange={handleDataChange}
            setFormData={setFormData}
            category={category}
          />
        );
      } else {
        // Add a new row if the dataLength exceeds the current row count
        updatedRows.push(
          <StockTableInput
            key={dataLength}
            index={dataLength}
            dataLength={dataLength}
            onDataLengthChange={handleDataChange}
            setFormData={setFormData}
            category={category}
          />
        );
      }
      return updatedRows;
    });
  }, [dataLength, category]);

  const refetchDataAndStoreCategory = (category) => {
    setCategory(category);
    refetchStocks();
  };

  return (
    <Content
      pageTitle={"Stock"}
      tableTitle={"Stock List"}
      navBar={<StockNavBar onItemClick={refetchDataAndStoreCategory} />}
      dataTable={<DataTable theads={theads} tRows={rows} />}
      dataLength={dataLength}
      detail={<StockDetail />}
    />
  );
};
