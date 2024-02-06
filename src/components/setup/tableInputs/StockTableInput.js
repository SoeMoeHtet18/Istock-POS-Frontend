import React, { useRef, useState } from "react";

const StockTableInput = ({
  index,
  dataLength,
  onDataLengthChange,
  setFormData,
  category,
}) => {
  const codeRef = useRef(null);
  const descriptionRef = useRef(null);
  const shortRef = useRef(null);
  const categoryRef = useRef(null);
  const purchaseCurrencyRef = useRef(null);
  const purchasePriceRef = useRef(null);
  const supplierCurrencyRef = useRef(null);
  const salePriceRef = useRef(null);
  const gpRef = useRef(null);

  const tcells = [
    {
      ref: codeRef,
      slug: "code",
      type: "text",
    },
    {
      ref: descriptionRef,
      slug: "description",
      type: "text",
    },
    {
      ref: shortRef,
      slug: "short",
      type: "text",
    },
    {
      ref: categoryRef,
      slug: "category",
      type: "text",
    },
    {
      ref: purchaseCurrencyRef,
      slug: "purchaseCurrency",
      type: "text",
    },
    {
      ref: purchasePriceRef,
      slug: "purchasePrice",
      type: "number",
    },
    {
      ref: supplierCurrencyRef,
      slug: "supplierCurrency",
      type: "text",
    },
    {
      ref: salePriceRef,
      slug: "salePrice",
      type: "number",
    },
    {
      ref: gpRef,
      slug: "gp",
      type: "number",
    },
  ];

  const handleInputChange =
    (setFormData, onDataLengthChange, index, slug) => (e) => {
      onDataLengthChange(index);

      // Use setFormData to update the state
      setFormData((prevFormData) => {
        const updatedSlugArray = [...(prevFormData[slug] || [])]; // Create a copy of the array for the given slug
        updatedSlugArray[index] = e.target.value; // Update the value at the specified index

        return {
          ...prevFormData,
          [slug]: updatedSlugArray,
        };
      });
    };

  const handleKeyDown = (e, index, ref, slug) => {
    if (e.key === "Shift" && e.key !== "Tab" && ref === gpRef) {
      codeRef.current = document.querySelector(`#${slug}-${index + 1}`);
      codeRef.current.focus();
    } else if (e.key === "Enter" && ref === codeRef) {
      descriptionRef.current.focus();
      categoryRef.current.value = `${category.name} - ${category.code}`;
    }
  };

  return (
    <tr className="border-b">
      {tcells.map((tcell) => (
        <td key={tcell.slug}>
          <input
            ref={tcell.ref}
            type={tcell.type}
            className={`w-full ${tcell.slug + "-" + index}`}
            disabled={index > dataLength}
            onChange={handleInputChange(
              setFormData,
              onDataLengthChange,
              index,
              tcell.slug
            )}
            onKeyDown={(e) => handleKeyDown(e, index, tcell.ref, tcell.slug)}
          />
        </td>
      ))}
    </tr>
  );
};

export default StockTableInput;
