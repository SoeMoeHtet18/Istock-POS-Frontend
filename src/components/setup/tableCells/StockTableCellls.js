import React, { useRef, useState } from "react";

const StockTableCellls = ({ index, dataLength, onDataLengthChange }) => {
  const codeRef = useRef(null);
  const descriptionRef = useRef(null);
  const shortRef = useRef(null);
  const categoryRef = useRef(null);
  const purchaseCurrencyRef = useRef(null);
  const purchasePriceRef = useRef(null);
  const supplierCurrencyRef = useRef(null);
  const salePriceRef = useRef(null);
  const gpRef = useRef(null);

  // const [code, setCode] = useState(null);
  // const [description, setDescription] = useState(null);
  // const [short, setShort] = useState(null);
  // const [category, setCategory] = useState(null);
  // const [purchaseCurrency, setPurchaseCurrency] = useState(null);
  // const [purchasePrice, setPurchasePrice] = useState(null);
  // const [supplierCurrency, setSupplierCurrency] = useState(null);
  // const [salePrice, setSalePrice] = useState(null);
  // const [gp, setGp] = useState(null);

  const tcells = [
    {
      ref: codeRef,
      slug: "code",
      // value: code,
      // setValue: setCode,
      type: "text",
    },
    {
      ref: descriptionRef,
      slug: "description",
      // value: description,
      // setValue: setDescription,
      type: "text",
    },
    {
      ref: shortRef,
      slug: "short",
      // value: short,
      // setValue: setShort,
      type: "text",
    },
    {
      ref: categoryRef,
      slug: "category",
      // value: category,
      // setValue: setCategory,
      type: "text",
    },
    {
      ref: purchaseCurrencyRef,
      slug: "purchaseCurrency",
      // value: purchaseCurrency,
      // setValue: setPurchaseCurrency,
      type: "number",
    },
    {
      ref: purchasePriceRef,
      slug: "purchasePrice",
      // value: purchasePrice,
      // setValue: setPurchasePrice,
      type: "number",
    },
    {
      ref: supplierCurrencyRef,
      slug: "supplierCurrency",
      // value: supplierCurrency,
      // setValue: setSupplierCurrency,
      type: "number",
    },
    {
      ref: salePriceRef,
      slug: "salePrice",
      // value: salePrice,
      // setValue: setSalePrice,
      type: "number",
    },
    {
      ref: gpRef,
      slug: "gp",
      // value: gp,
      // setValue: setGp,
      type: "number",
    },
  ];

  const handleInputChange =
    (setter, onDataLengthChange, index, ref, slug) => (e) => {
      onDataLengthChange(index);
      if (ref === gpRef) {
        codeRef.current = document.querySelector(`#${slug}-${index + 1}`);
        codeRef.current.focus();
      }
      // setter(e.target.value);
    };

  return (
    <tr className="border-b">
      {tcells.map((tcell) => (
        <td key={tcell.value}>
          <input
            ref={tcell.ref}
            type={tcell.type}
            className={`w-full ${tcell.slug + "-" + index}`}
            disabled={index > dataLength}
            // value={tcell.value}
            onChange={handleInputChange(
              tcell.setValue,
              onDataLengthChange,
              index,
              tcell.ref,
              tcell.slug
            )}
          />
        </td>
      ))}
    </tr>
  );
};

export default StockTableCellls;
