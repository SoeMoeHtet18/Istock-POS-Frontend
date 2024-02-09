import React, { useEffect, useRef, useState } from "react";

const StockTableInput = ({
  index,
  dataLength,
  onDataLengthChange,
  formData,
  setFormData,
  category,
  subCategory,
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
        const updatedIDArray = [...(prevFormData.ids || [])];
        updatedIDArray[index] = index + 1;
        const updatedBrandArray = [...(prevFormData.brand || [])];
        updatedBrandArray[index] = index + 1;

        return {
          ...prevFormData,
          [slug]: updatedSlugArray,
          ids: updatedIDArray,
          brand: updatedBrandArray,
        };
      });
      setEditIndex(index);
    };

  const handleKeyDown = (
    event,
    index,
    currentRef,
    slug,
    category,
    subCategory,
    setFormData
  ) => {
    const isShiftKey = event.key === "Shift";
    const isEnterKey = event.key === "Enter";
    const isTabKey = event.key === "Tab";

    if (isShiftKey && !isTabKey && currentRef === gpRef) {
      const nextElement = document.querySelector(`#${slug}-${index + 1}`);
      if (nextElement) {
        nextElement.focus();
      }
    } else if (isEnterKey && currentRef === codeRef) {
      const selectedCategory = subCategory ?? category;
      categoryRef.current.value = `${selectedCategory.name} - ${selectedCategory.code}`;

      setFormData((prevFormData) => {
        const updatedCategoryIds = [...(prevFormData.categoryIds || [])];
        updatedCategoryIds[index] = selectedCategory.id;

        const updatedSubCategoryIds = [...(prevFormData.subCategoryIds || [])];
        if (subCategory) {
          updatedSubCategoryIds[index] = subCategory.id;
        }

        return {
          ...prevFormData,
          categoryIds: updatedCategoryIds,
          subCategoryIds: updatedSubCategoryIds,
        };
      });

      if (descriptionRef.current) {
        descriptionRef.current.focus();
      }
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
      {tcells.map((tcell) => {
        console.log(formData);
        return (
          <td key={tcell.slug}>
            <input
              ref={tcell.ref}
              type={tcell.type}
              className={`w-full ${tcell.slug + "-" + index}`}
              disabled={index > dataLength}
              value={formData?.[tcell.slug]?.[index] ?? ""}
              onChange={handleInputChange(
                setFormData,
                onDataLengthChange,
                index,
                tcell.slug
              )}
              onKeyDown={(e) =>
                handleKeyDown(
                  e,
                  index,
                  tcell.ref,
                  tcell.slug,
                  category,
                  subCategory,
                  setFormData
                )
              }
              onFocus={() => setEditIndex(index)}
            />
          </td>
        );
      })}
    </tr>
  );
};

export default StockTableInput;
