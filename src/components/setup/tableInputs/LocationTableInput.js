import React, { useEffect, useRef, useState, useCallback } from "react";

const LocationTableInput = ({
  index,
  dataLength,
  onDataLengthChange,
  formData,
  setFormData,
  branches,
  locations,
  category,
  subCategory,
  setEditIndex,
  editingSlug,
  editIndex,
}) => {
  const nameRef = useRef(null);
  const shortRef = useRef(null);
  const locationGroupRef = useRef(null);
  const branchRef = useRef(null);
  const sortCodeRef = useRef(null);
  const diffSPRef = useRef(null);

  const [isDataUpdate, setIsDataUpdate] = useState(false);

  const tcells = [
    { ref: nameRef, slug: "names", type: "text" },
    { ref: shortRef, slug: "shorts", type: "text" },
    { ref: branchRef, slug: "branches", type: "select", options: branches },
    {
      ref: locationGroupRef,
      slug: "locationGroups",
      type: "select",
      options: locations,
    },
    { ref: sortCodeRef, slug: "sortCodes", type: "text" },
    { ref: diffSPRef, slug: "diffSPs", type: "checkbox" },
  ];

  const handleInputChange =
    (setFormData, onDataLengthChange, index, slug) => (e) => {
      onDataLengthChange(index);
      setEditIndex(index);

      // Use setFormData to update the state
      setFormData((prevFormData) => {
        const updatedIDArray = [...(prevFormData.ids || [])];
        updatedIDArray[index] = updatedIDArray[index] ?? null;
        const updatedSlugArray = [...(prevFormData[slug] || [])];
        updatedSlugArray[index] = e.target.value;

        return {
          ...prevFormData,
          ids: updatedIDArray,
          [slug]: updatedSlugArray,
        };
      });
    };

  useEffect(() => {
    if (
      formData &&
      (editingSlug === null || editingSlug === "") &&
      editIndex == null &&
      editIndex !== 0
    ) {
      tcells.map((tcell) => {
        let ref = tcell.ref;
        let valueSlug = tcell.slug;

        ref.current = document.querySelector(`.${valueSlug}-${index}`);
        if (ref.current) {
          ref.current.value = formData?.[valueSlug]?.[index] ?? "";
        }
      });
    }
  }, [formData, editingSlug, editIndex]);

  return (
    <tr className="border-b">
      {tcells.map(({ ref, slug, type, options }) => {
        console.log(options);
        return (
          <td key={slug}>
            {type === "select" ? (
              <select
                ref={ref}
                className={`w-full ${slug}-${index}`}
                disabled={index > dataLength}
                onChange={handleInputChange(
                  setFormData,
                  onDataLengthChange,
                  index,
                  slug
                )}
                onFocus={() => setEditIndex(index)}
              >
                {slug === "locationGroups" && formData?.branches?.[index]
                  ? options
                      .filter(
                        (option) =>
                          option.branch_id == formData?.branches?.[index]
                      )
                      .map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))
                  : options?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
              </select>
            ) : (
              <input
                ref={ref}
                type={type}
                className={`w-full ${slug}-${index}`}
                disabled={index > dataLength}
                onChange={handleInputChange(
                  setFormData,
                  onDataLengthChange,
                  index,
                  slug
                )}
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
