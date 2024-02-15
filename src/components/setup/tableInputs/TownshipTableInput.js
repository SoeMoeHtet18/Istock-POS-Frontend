import React, { useRef } from "react";

const TownshipTableInput = ({
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
  const divisionRef = useRef(null);
  const sortIdRef = useRef(null);

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
      ref: divisionRef,
      slug: "divisionIds",
      type: "select",
      options: categories,
    },
    {
      ref: sortIdRef,
      slug: "sortIds",
      type: "text",
    },
  ];

  const handleInputChange =
    (setFormData, onDataLengthChange, index, slug) => (e) => {
      onDataLengthChange(index);
      setEditIndex(index);

      // Use setFormData to update the state
      setFormData((prevFormData) => {
        const updatedIDArray = [...(prevFormData.ids || [])];
        updatedIDArray[index] = updatedIDArray[index] ?? null;
        const updatedSlugArray = [...(prevFormData[slug] || [])]; // Create a copy of the array for the given slug
        updatedSlugArray[index] = e.target.value; // Update the value at the specified index

        return {
          ...prevFormData,
          ids: updatedIDArray,
          [slug]: updatedSlugArray,
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

  return (
    <tr className="border-b">
      {tcells.map((tcell) => {
        let valueSlug = tcell.slug;

        return (
          <td key={tcell.slug}>
            {tcell.type === "select" ? (
              <select
                ref={tcell.ref}
                className={`w-full ${valueSlug + "-" + index}`}
                disabled={index > dataLength}
                value={formData?.[valueSlug]?.[index] ?? ""}
                onChange={handleInputChange(
                  setFormData,
                  onDataLengthChange,
                  index,
                  valueSlug
                )}
              >
                {tcell.options?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                ref={tcell.ref}
                type={tcell.type}
                className={`w-full ${valueSlug + "-" + index}`}
                disabled={index > dataLength}
                value={formData?.[valueSlug]?.[index] ?? ""}
                onChange={handleInputChange(
                  setFormData,
                  onDataLengthChange,
                  index,
                  valueSlug
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

export default TownshipTableInput;
