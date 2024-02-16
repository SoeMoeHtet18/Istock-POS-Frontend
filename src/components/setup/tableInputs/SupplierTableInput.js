import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

const SupplierTableInput = ({
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
  const nameRef = useRef(null);
  const shortRef = useRef(null);
  const addressRef = useRef(null);
  const creditRef = useRef(null);
  const consignRef = useRef(null);
  const inactiveRef = useRef(null);

  const tcells = [
    {
      ref: nameRef,
      slug: "names",
      type: "text",
    },
    {
      ref: shortRef,
      slug: "shorts",
      type: "text",
    },
    {
      ref: addressRef,
      slug: "addresses",
      type: "text",
    },
    {
      ref: creditRef,
      slug: "credits",
      type: "checkbox",
    },
    {
      ref: consignRef,
      slug: "consigns",
      type: "checkbox",
    },
    {
      ref: inactiveRef,
      slug: "inactives",
      type: "checkbox",
    },
  ];

  const handleInputChange =
    (setFormData, onDataLengthChange, index, slug) => (e) => {
      onDataLengthChange(index);
      setEditIndex(index);

      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value; // Check if the input type is checkbox

      // Use setFormData to update the state
      setFormData((prevFormData) => {
        const updatedIDArray = [...(prevFormData.ids || [])];
        updatedIDArray[index] = updatedIDArray[index] ?? null;
        const updatedSlugArray = [...(prevFormData[slug] || [])]; // Create a copy of the array for the given slug
        updatedSlugArray[index] = value; // Update the value at the specified index

        return {
          ...prevFormData,
          [slug]: updatedSlugArray,
          ids: updatedIDArray,
        };
      });
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

    // if (isShiftKey && !isTabKey && currentRef === diffSPRef) {
    //   const nextElement = document.querySelector(`#${slug}-${index + 1}`);
    //   if (nextElement) {
    //     nextElement.focus();
    //   }
    // } else if (
    //   (isEnterKey && currentRef === nameRef && category) ||
    //   subCategory
    // ) {
    //   const selectedCategory = subCategory ?? category;
    //   categoryRef.current.value = selectedCategory.id;

    //   setFormData((prevFormData) => {
    //     const updatedCategoryIds = [...(prevFormData.categoryIds || [])];
    //     updatedCategoryIds[index] = category.id;

    //     const updatedSubCategoryIds = [...(prevFormData.subCategoryIds || [])];
    //     if (subCategory) {
    //       updatedSubCategoryIds[index] = subCategory.id;
    //     }

    //     return {
    //       ...prevFormData,
    //       categoryIds: updatedCategoryIds,
    //       subCategoryIds: updatedSubCategoryIds,
    //     };
    //   });

    //   if (descriptionRef.current) {
    //     descriptionRef.current.focus();
    //   }
    // }
  };

  useEffect(() => {
    let ref;
    switch (editingSlug) {
      case "name":
        ref = nameRef;
        break;
      case "short":
        ref = shortRef;
        break;
      case "address":
        ref = addressRef;
        break;
      case "credit":
        ref = creditRef;
        break;
      case "consign":
        ref = consignRef;
        break;
      default:
        ref = inactiveRef;
        break;
    }
    // if (ref !== categoryRef) {
    //   ref.current = document.querySelector(`.${editingSlug}-${editIndex}`);
    //   ref.current.value = formData?.[editingSlug]?.[editIndex] ?? "";
    // }
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
          <td
            key={tcell.slug}
            className={clsx(tcell.type === "checkbox" && "text-center")}
          >
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
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default SupplierTableInput;
