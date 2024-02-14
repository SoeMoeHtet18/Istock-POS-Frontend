import React, { useEffect, useRef, useState } from "react";

const LocationTableInput = ({
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
  const locatonGroupRef = useRef(null);
  const branchRef = useRef(null);
  const sortCodeRef = useRef(null);
  const diffSPRef = useRef(null);

  const tcells = [
    {
      ref: nameRef,
      slug: "name",
      type: "text",
    },
    {
      ref: shortRef,
      slug: "short",
      type: "text",
    },
    {
      ref: locatonGroupRef,
      slug: "locatonGroup",
      type: "select",
      options: categories,
    },
    {
      ref: branchRef,
      slug: "branch",
      type: "select",
      options: categories,
    },
    {
      ref: sortCodeRef,
      slug: "sort",
      type: "text",
    },
    {
      ref: diffSPRef,
      slug: "diffSP",
      type: "checkbox",
    },
  ];

  const handleInputChange =
    (setFormData, onDataLengthChange, index, slug) => (e) => {
      onDataLengthChange(index);
      setEditIndex(index);
      console.log(formData?.[slug]);
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
      default:
        ref = diffSPRef;
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

export default LocationTableInput;
