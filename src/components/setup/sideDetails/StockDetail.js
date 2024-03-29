import React, { useEffect, useState } from "react";
import { TiArrowDownThick } from "react-icons/ti";
import { ImageUpload } from "../../common/inputs/ImageUpload";

export const StockDetail = ({
  categories,
  category,
  subCategory,
  index,
  formData,
  setFormData,
  setEditingSlug,
}) => {
  const [detailInputs, setDetailInputs] = useState([]);

  const handleInputChange = (setFormData, index, slug) => (e) => {
    // Use setFormData to update the state
    setFormData((prevFormData) => {
      const updatedSlugArray = [...(prevFormData[slug] || [])]; // Create a copy of the array for the given slug
      updatedSlugArray[index] = e.target.value; // Update the value at the specified index

      return {
        ...prevFormData,
        [slug]: updatedSlugArray,
      };
    });
    setEditingSlug(slug);
  };

  const imageUpload = (img) => {
    setFormData((prevFormData) => {
      const updatedImgArray = [...(prevFormData["image"] || [])];
      updatedImgArray[index] = img ?? null;

      return {
        ...prevFormData,
        image: updatedImgArray,
      };
    });
  };

  useEffect(() => {
    setDetailInputs([
      {
        label: "Code",
        slug: "code",
        type: "text",
      },
      {
        label: "Description",
        slug: "description",
        type: "text",
      },
      {
        label: "Short Name",
        slug: "short",
        type: "text",
      },
      {
        label: "Category",
        slug: "category",
        type: "select",
        options: categories,
      },
      {
        label: "Brand",
        slug: "brand",
        type: "select",
        options: ["Brand 1", "Brand 2", "Brand 3"],
      },
      {
        label: "Last Supplier",
        slug: "last_supplier",
        type: "select",
        options: ["Supplier One", "Supplier Two", "Supplier Three"],
      },
      {
        label: "Remark",
        slug: "remark",
        type: "text",
      },
    ]);
  }, [categories, category, subCategory]);

  return (
    <>
      <div className="border relative px-2 pt-3 pb-2 mb-3 w-2.5w">
        <span className="top-letter">Detail</span>
        <div className="flex">
          <div className="text-xs flex-1">
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
                    onChange={handleInputChange(setFormData, index, input.slug)}
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
                    value={
                      input.slug === "category"
                        ? formData?.subCategoryIds?.[index] ??
                          formData?.categoryIds?.[index] ??
                          null
                        : formData?.[input.slug]?.[index] ?? ""
                    }
                    onChange={handleInputChange(
                      setFormData,
                      index,
                      input.slug === "category" &&
                        (subCategory || formData?.subCategoryIds?.[index])
                        ? "subCategoryIds"
                        : input.slug === "category" && !subCategory
                        ? "categoryIds"
                        : input.slug
                    )}
                  >
                    {input.slug === "category" &&
                    formData?.subCategoryIds?.[index]
                      ? input.options?.map((option) => {
                          if (formData?.categoryIds?.[index] === option.id) {
                            return option.sub_categories.map((subOption) => (
                              <option key={subOption.id} value={subOption.id}>
                                {subOption.name} - {subOption.code}
                              </option>
                            ));
                          }
                        })
                      : input.slug === "category" &&
                        formData?.categoryIds?.[index]
                      ? input.options?.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name} - {option.code}
                          </option>
                        ))
                      : input.options?.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                  </select>
                </div>
              )
            )}
          </div>
          <div className="w-5/12">
            <ImageUpload imageUpload={imageUpload} />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-1">
        {/* <div className="border relative pt-3">
          <span className="top-letter">Reorder and Account</span>
          <div className="flex flex-col">
            <div className="text-xs ps-1">
              <div className="flex justify-between py-0.5 h-7 w-2/3">
                <label>MinQty</label>
                <input type="text" className="w-1/2 border"></input>
              </div>
              <div className="flex justify-between py-0.5 h-7 w-2/3">
                <label>MaxQty</label>
                <input type="text" className="w-1/2 border"></input>
              </div>
              <div className="flex justify-between py-0.5 h-7">
                <div className="flex justify-between w-2/3">
                  <label>Pur.Type</label>
                  <select className="w-1/2 border">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>

                <button className="border flex items-center text-2xs h-6">
                  <TiArrowDownThick /> Reorder
                </button>
              </div>
            </div>

            <div className="p-2 grid grid-2 text-2xs gap-x-2 gap-y-1">
              <div className="flex justify-between items-center">
                <input type="checkbox" />
                <label>Open Price</label>
              </div>
              <div className="flex justify-between items-center">
                <input type="checkbox" />
                <label>Non Stock</label>
              </div>
              <div className="flex justify-between items-center">
                <input type="checkbox" />
                <label>Inactive</label>
              </div>
              <div className="flex justify-between items-center">
                <input type="checkbox" />
                <label>No Tax</label>
              </div>
            </div>
          </div>
        </div> */}
        <div className="border relative px-2 pt-3 w-1/2">
          <span className="top-letter">Price</span>
          <div className="flex">
            <div className="text-xs">
              <div className="flex justify-between py-0.5 h-7">
                <label>Pur Price</label>
                <input
                  type="text"
                  className="w-3/5 border"
                  value={formData?.purchasePrice?.[index] ?? ""}
                  onChange={handleInputChange(
                    setFormData,
                    index,
                    "purchasePrice"
                  )}
                ></input>
              </div>
              <div className="flex justify-between py-0.5 h-7">
                <label>Sale Price</label>
                <input
                  type="text"
                  className="w-3/5 border"
                  value={formData?.salePrice?.[index] ?? ""}
                  onChange={handleInputChange(setFormData, index, "salePrice")}
                ></input>
              </div>
              <div className="flex justify-between py-0.5 h-7">
                <label>Sale 1</label>
                <input
                  type="text"
                  className="w-3/5 border"
                  value={formData?.salePriceOne?.[index] ?? ""}
                  onChange={handleInputChange(
                    setFormData,
                    index,
                    "salePriceOne"
                  )}
                ></input>
              </div>
              <div className="flex justify-between py-0.5 h-7">
                <label>Sale 2</label>
                <input
                  type="text"
                  className="w-3/5 border"
                  value={formData?.salePriceTwo?.[index] ?? ""}
                  onChange={handleInputChange(
                    setFormData,
                    index,
                    "salePriceTwo"
                  )}
                ></input>
              </div>
              <div className="flex justify-between py-0.5 h-7">
                <label>Sale 3</label>
                <input
                  type="text"
                  className="w-3/5 border"
                  value={formData?.salePriceThree?.[index] ?? ""}
                  onChange={handleInputChange(
                    setFormData,
                    index,
                    "salePriceThree"
                  )}
                ></input>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};
