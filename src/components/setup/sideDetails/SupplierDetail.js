import React, { useEffect, useState } from "react";
import { TiArrowDownThick } from "react-icons/ti";
import { ImageUpload } from "../../common/inputs/ImageUpload";

export const SupplierDetail = ({
  categories,
  category,
  subCategory,
  index,
  formData,
  setFormData,
  setEditingSlug,
}) => {
  const [detailInputs, setDetailInputs] = useState([]);
  const [contactInputs, setContactInputs] = useState([]);

  const handleInputChange = (setFormData, index, slug, selectedData) => (e) => {
    // Use setFormData to update the state
    setFormData((prevFormData) => {
      const updatedSlugArray = [...(prevFormData[slug] || [])]; // Create a copy of the array for the given slug
      updatedSlugArray[index] = selectedData ?? e.target.value; // Update the value at the specified index

      return {
        ...prevFormData,
        [slug]: updatedSlugArray,
      };
    });
    setEditingSlug(slug);
  };

  useEffect(() => {
    setDetailInputs([
      {
        label: "Code",
        slug: "code",
        type: "text",
      },
      {
        label: "Supplier",
        slug: "supplier",
        type: "text",
      },
      {
        label: "Company Name",
        slug: "company",
        type: "text",
      },
      {
        label: "Address",
        slug: "address",
        type: "text",
      },
      {
        label: "Township",
        slug: "township",
        type: "select",
        options: ["Brand 1", "Brand 2", "Brand 3"],
      },
    ]);

    setContactInputs([
      {
        label: "Contact",
        slug: "contact",
        type: "text",
      },
      {
        label: "Fax",
        slug: "fax",
        type: "text",
      },
      {
        label: "Phone",
        slug: "phone",
        type: "ph",
      },
      {
        label: "email",
        slug: "email",
        type: "email",
      },
    ]);
  }, [categories, category, subCategory]);

  return (
    <div className="border relative px-2 pt-5 pb-2 mb-3 w-4.1w">
      <span className="top-letter">Detail</span>
      <div className="flex">
        <div className="text-xs flex flex-1">
          <div className="grid grid-cols-2 gap-y-5">
            <div className="border relative px-2 pt-3 pb-2">
              <span className="top-letter">Name and Address</span>
              {detailInputs.map((input) =>
                input.type === "text" ? (
                  <div
                    key={input.slug}
                    className="flex justify-between py-0.5 w-full h-7"
                  >
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      className="w-3/5 border px-0.5"
                      value={formData?.[input.slug]?.[index] ?? ""}
                      onChange={handleInputChange(
                        setFormData,
                        index,
                        input.slug
                      )}
                    ></input>
                  </div>
                ) : (
                  <div
                    key={input.slug}
                    className="flex justify-between py-0.5 h-7"
                  >
                    <label>{input.label}</label>
                    <select
                      className="w-3/5 border px-0.5"
                      value={formData?.[input.slug]?.[index]}
                      onChange={handleInputChange(
                        setFormData,
                        index,
                        formData?.[input.slug]?.[index]
                      )}
                    >
                      {input.options?.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              )}
            </div>
            <div className="border relative px-2 pt-3">
              <span className="top-letter">Contact</span>
              {contactInputs.map((input) => (
                <div
                  key={input.slug}
                  className="flex justify-between py-0.5 w-full h-7"
                >
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    className="w-3/5 border px-0.5"
                    value={formData?.[input.slug]?.[index] ?? ""}
                    onChange={handleInputChange(setFormData, index, input.slug)}
                  ></input>
                </div>
              ))}
            </div>
            <div className="border relative px-2 py-3">
              <span className="top-letter">Credit</span>
              <div className="flex items-center">
                <div className="flex items-center gap-x-2">
                  <label className="text-nowrap">Allow Credit Purchase</label>
                  <input type="checkbox" name="credit" />
                </div>
                <div className="flex items-center gap-x-2">
                  <label className="text-nowrap">Due In Days</label>
                  <input
                    style={{ width: "40px", height: "25px" }}
                    type="text"
                    name="due_days"
                    className="border px-0.5"
                  />
                </div>
              </div>
            </div>
            <div className="border relative px-2 py-3">
              <span className="top-letter">Consign</span>
              <div className="flex items-center gap-x-2 mt-1">
                <label>Allow Consign Purchase</label>
                <input type="checkbox" name="consign" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
