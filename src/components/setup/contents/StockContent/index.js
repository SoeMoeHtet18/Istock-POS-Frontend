import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import "./index.css";
import DataTable from "../../layout/table";
import { Content } from "../../layout/content";
import StockTableCellls from "../../tableCells/StockTableCellls";

const NavBar = () => (
  <div className="p-2 border w-1w flex-1">
    <div className="flex-ver-center">
      <FaHome />
      <h3 className="ms-1 text-sm">Stock</h3>
    </div>
  </div>
);

export const StockContent = () => {
  const [dataLength, setDataLength] = useState(0);

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

  while (tRows.length < 10) {
    tRows.push(
      <StockTableCellls
        key={`row-${tRows.length}`}
        index={tRows.length}
        dataLength={dataLength}
        onDataLengthChange={handleDataChange}
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
          <StockTableCellls
            key={dataLength}
            index={dataLength}
            dataLength={dataLength}
            onDataLengthChange={handleDataChange}
          />
        );
      } else {
        // Add a new row if the dataLength exceeds the current row count
        updatedRows.push(
          <StockTableCellls
            key={dataLength}
            index={dataLength}
            dataLength={dataLength}
            onDataLengthChange={handleDataChange}
          />
        );
      }
      return updatedRows;
    });
  }, [dataLength]);

  return (
    <Content
      title={"Stock"}
      navBar={<NavBar />}
      dataTable={<DataTable theads={theads} tRows={rows} />}
    />
  );
};
