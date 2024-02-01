import React, { useState } from "react";

const StockTableCellls = ({ index, dataLength, onDataLengthChange }) => {
  console.log(onDataLengthChange);
  const [code, setCode] = useState(null);
  const [description, setDescription] = useState(null);
  const [short, setShort] = useState(null);
  const [category, setCategory] = useState(null);
  const [purchaseCurrency, setPurchaseCurrency] = useState(null);
  const [purchasePrice, setPurchasePrice] = useState(null);
  const [supplierCurrency, setSupplierCurrency] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [gp, setGp] = useState(null);

  const tcells = [
    { value: code, setValue: setCode, type: "text" },
    { value: description, setValue: setDescription, type: "text" },
    { value: short, setValue: setShort, type: "text" },
    { value: category, setValue: setCategory, type: "text" },
    { value: purchaseCurrency, setValue: setPurchaseCurrency, type: "number" },
    { value: purchasePrice, setValue: setPurchasePrice, type: "number" },
    { value: supplierCurrency, setValue: setSupplierCurrency, type: "number" },
    { value: salePrice, setValue: setSalePrice, type: "number" },
    { value: gp, setValue: setGp, type: "number" },
  ];

  const handleInputChange = (setter, onDataLengthChange, index) => (e) => {
    onDataLengthChange(index);

    setter(e.target.value);
  };

  return (
    <tr className="border-b">
      {tcells.map((tcell) => (
        <td key={tcell.value}>
          <input
            type={tcell.type}
            className="w-full"
            disabled={index > dataLength}
            value={tcell.value}
            onChange={handleInputChange(
              tcell.setValue,
              onDataLengthChange,
              index
            )}
          />
        </td>
      ))}
    </tr>
  );
};

export default StockTableCellls;
