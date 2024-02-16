import React, { useEffect, useRef, useState } from "react";

const StockTableInput = ({
  index,
  dataLength,
  onDataLengthChange,
  formData,
  setFormData,
  categories,
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
      type: "select",
      options: categories,
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
        updatedIDArray[index] = updatedIDArray[index] ?? null;
        const updatedBrandArray = [...(prevFormData.brand || [])];
        updatedBrandArray[index] = index + 1;

        return {
          ...prevFormData,
          [slug]: updatedSlugArray,
          ids: updatedIDArray,
          brand: updatedBrandArray,
        };
      });

      console.log(formData);
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
    } else if (
      (isEnterKey && currentRef === codeRef && category) ||
      subCategory
    ) {
      const selectedCategory = subCategory ?? category;
      categoryRef.current.value = selectedCategory.id;

      setFormData((prevFormData) => {
        const updatedCategoryIds = [...(prevFormData.categoryIds || [])];
        updatedCategoryIds[index] = category.id;

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

    if (formData && editingSlug && editIndex) {
      console.log("editIndex exist", editIndex);
      if (editingSlug === "category") {
        if (formData?.subCategoryIds?.[index]) {
          editingSlug = "subCategoryIds";
        } else {
          editingSlug = "categoryIds";
        }
      }
      ref.current = document.querySelector(`.${editingSlug}-${editIndex}`);
      if (ref.current) {
        ref.current.value = formData?.[editingSlug]?.[editIndex] ?? "";
      }
    }

    if (
      formData &&
      (editingSlug === null || editingSlug === "") &&
      editIndex == null &&
      editIndex !== 0
    ) {
      tcells.map((tcell) => {
        let valueSlug = tcell.slug;
        if (tcell.slug === "category") {
          if (formData?.subCategoryIds?.[index]) {
            valueSlug = "subCategoryIds";
          } else {
            valueSlug = "categoryIds";
          }
        }

        ref.current = document.querySelector(`.${valueSlug}-${index}`);
        if (ref.current) {
          ref.current.value = formData?.[valueSlug]?.[index] ?? "";
        }
      });
    }
  }, [formData, editingSlug, editIndex]);

  return (
    <tr className="border-b">
      {tcells.map((tcell) => {
        let valueSlug = tcell.slug;
        if (tcell.slug === "category") {
          if (formData?.subCategoryIds?.[index]) {
            valueSlug = "subCategoryIds";
          } else {
            valueSlug = "categoryIds";
          }
        }
        return (
          <td key={tcell.slug}>
            {tcell.type === "select" ? (
              <select
                ref={tcell.ref}
                className={`w-full ${tcell.slug + "-" + index}`}
                disabled={index > dataLength}
                value={formData?.[valueSlug]?.[index] ?? ""}
                onChange={handleInputChange(
                  setFormData,
                  onDataLengthChange,
                  index,
                  valueSlug
                )}
              >
                {valueSlug === "categoryIds"
                  ? tcell.options?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))
                  : valueSlug === "subCategoryIds"
                  ? tcell.options?.map((option) => {
                      if (formData?.categoryIds?.[index] === option.id) {
                        return option.sub_categories.map((subOption) => (
                          <option key={subOption.id} value={subOption.id}>
                            {subOption.name} - {subOption.code}
                          </option>
                        ));
                      }
                    })
                  : tcell.options?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
              </select>
            ) : (
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
                onFocus={() => {
                  setEditIndex(index);
                  console.log("focus", index);
                }}
              />
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default StockTableInput;
