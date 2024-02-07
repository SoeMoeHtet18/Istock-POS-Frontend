import React, { useEffect, useRef, useState } from "react";

const StockTableInput = ({
  index,
  dataLength,
  onDataLengthChange,
  formData,
  setFormData,
  category,
  setEditIndex,
  editingSlug,
  editIndex,
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
      setEditIndex(index);
      // Use setFormData to update the state
      setFormData((prevFormData) => {
        const updatedSlugArray = [...(prevFormData[slug] || [])]; // Create a copy of the array for the given slug
        updatedSlugArray[index] = e.target.value; // Update the value at the specified index

        return {
          ...prevFormData,
          [slug]: updatedSlugArray,
        };
      });
      setEditIndex(index);
    };

  const handleKeyDown = (e, index, ref, slug, category) => {
    if (e.key === "Shift" && e.key !== "Tab" && ref === gpRef) {
      codeRef.current = document.querySelector(`#${slug}-${index + 1}`);
      codeRef.current.focus();
    } else if (e.key === "Enter" && ref === codeRef) {
      categoryRef.current.value = `${category.name} - ${category.code}`;
      descriptionRef.current.focus();
    }
  };

  useEffect(() => {
    let ref;
    switch (editingSlug) {
      case "code":
        ref = codeRef;
        break;
      case "description":
        ref = descriptionRef;
        break;
      case "short":
        ref = shortRef;
        break;
      case "purchasePrice":
        ref = purchasePriceRef;
        break;
      case "salePrice":
        ref = salePriceRef;
        break;
      default:
        ref = categoryRef;
        break;
    }
    if (ref !== categoryRef) {
      ref.current = document.querySelector(`.${editingSlug}-${editIndex}`);
      ref.current.value = formData?.[editingSlug]?.[editIndex] ?? "";
    }
  }, [formData, editingSlug, editIndex]);

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
            onKeyDown={(e) =>
              handleKeyDown(e, index, tcell.ref, tcell.slug, category)
            }
            onFocus={() => setEditIndex(index)}
            onBlur={() => setEditIndex(null)}
          />
        </td>
      ))}
    </tr>
  );
};

export default StockTableInput;
