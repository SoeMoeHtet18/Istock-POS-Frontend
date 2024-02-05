import React, { useRef, useState } from "react";

const StockTableCell = ({ tcells }) => {
  return (
    <tr className="border-b">
      {tcells.map((tcell) => (
        <td key={tcell.value}>{tcell.value}</td>
      ))}
    </tr>
  );
};

export default StockTableCell;
