import React, { useEffect, useState } from "react";
import { Content } from "../../layout/content";
import { LocationNavBar } from "../../navBars/LocationNavBar";
import DataTable from "../../layout/table";
import {
  useCreateShopMutation,
  useGetAllShopsQuery,
} from "../../../../tools/api-services/shopApi";
import { useGetAllBranchesQuery } from "../../../../tools/api-services/branchApi";
import LocationTableInput from "../../tableInputs/LocationTableInput";
import SupplierTableInput from "../../tableInputs/SupplierTableInput";
import { SupplierDetail } from "../../sideDetails/SupplierDetail";
import { SupplierNavBar } from "../../navBars/SupplierNavBar";

export const SupplierContent = () => {
  const [dataLength, setDataLength] = useState(0);
  const [formData, setFormData] = useState({});
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editingSlug, setEditingSlug] = useState("");
  const [isDataCatched, setIsDataCatched] = useState(false);

  const {
    data: shops,
    error,
    isLoading,
    isSuccess: isShopsFetched,
    refetch: refetchShops,
  } = useGetAllShopsQuery({
    categoryId: category != null ? category.id : "",
    subCategoryId: subCategory != null ? subCategory.id : "",
  });

  const { data: categories, refetch: refetchAllCategories } =
    useGetAllBranchesQuery();

  const [createShop, { isSuccess }] = useCreateShopMutation();

  useEffect(() => {
    if (shops) {
      setFormData(() => ({
        ids: shops.map((shop) => shop.id) ?? [],
        code: shops.map((shop) => shop.barcode) ?? [],
        description: shops.map((shop) => shop.name) ?? [],
        short: shops.map((shop) => shop.short_name) ?? [],
        categoryIds: shops.map((shop) => shop.category_id) ?? [],
        subCategoryIds: shops.map((shop) => shop.sub_category_id) ?? [],
        brand: shops.map((shop) => shop.brand) ?? [],
        purchaseCurrency: shops.map((shop) => shop.purchase_currency) ?? [],
        purchasePrice: shops.map((shop) => shop.purchase_price) ?? [],
        supplierCurrency: shops.map((shop) => shop.supplier_currency) ?? [],
        salePrice: shops.map((shop) => shop.sale_price) ?? [],
        salePriceOne: shops.map((shop) => shop.sale_price_one) ?? [],
        salePriceTwo: shops.map((shop) => shop.sale_price_two) ?? [],
        salePriceThree: shops.map((shop) => shop.sale_price_three) ?? [],
        gp: shops.map((shop) => shop.gp) ?? [],
        image: shops.map((shop) => shop.image) ?? [],
      }));
      setDataLength(shops.length);
    }
  }, [shops]);

  const handleDataChange = (index) => {
    setDataLength((prevDataLength) =>
      prevDataLength === parseInt(index) ? prevDataLength + 1 : prevDataLength
    );
  };

  const theads = [
    { title: "Name", width: "25%" },
    { title: "Short", width: "20%" },
    { title: "Address", width: "25%" },
    { title: "Credit", width: "10%", center: true },
    { title: "Consign", width: "10%", center: true },
    { title: "Inactive", width: "10%", center: true },
  ];

  const [rows, setRows] = useState([]);

  const createBulkSuppliers = () => {
    const form = new FormData();

    form.append("ids", formData.ids ? JSON.stringify(formData.ids) : []);
    form.append("barcodes", formData.code ? JSON.stringify(formData.code) : []);
    form.append(
      "names",
      formData.description ? JSON.stringify(formData.description) : []
    );
    form.append(
      "short_names",
      formData.short ? JSON.stringify(formData.short) : []
    );
    form.append(
      "categoryIds",
      formData.categoryIds ? JSON.stringify(formData.categoryIds) : []
    );
    form.append(
      "subcategoryIds",
      formData.subCategoryIds ? JSON.stringify(formData.subCategoryIds) : []
    );
    form.append("brands", formData.brand ? JSON.stringify(formData.brand) : []);
    form.append(
      "purchase_prices",
      formData.purchasePrice ? JSON.stringify(formData.purchasePrice) : []
    );
    form.append(
      "sale_prices",
      formData.salePrice ? JSON.stringify(formData.salePrice) : []
    );
    form.append(
      "sale_price_one",
      formData.salePriceOne ? JSON.stringify(formData.salePriceOne) : []
    );
    form.append(
      "sale_price_two",
      formData.salePriceTwo ? JSON.stringify(formData.salePriceTwo) : []
    );
    form.append(
      "sale_price_three",
      formData.salePriceThree ? JSON.stringify(formData.salePriceThree) : []
    );
    form.append("images", formData.image ?? []);

    createShop(form);
  };

  const bottomNavBtns = [
    {
      name: "Confirm",
      key: "F5",
      onClick: createBulkSuppliers,
    },
    {
      name: "Delete",
      key: "F8",
      onClick: () => {},
    },
    {
      name: "Unit Delete",
      key: "Shift + F8",
      onClick: () => {},
    },
  ];

  useEffect(() => {
    setIsDataCatched(false);
  }, [shops]);

  useEffect(() => {
    if (isShopsFetched && !isDataCatched && categories) {
      const dataFillLength = dataLength < 10 ? 10 : dataLength;
      const newRows = [];
      for (let i = 0; i <= dataFillLength; i++) {
        newRows.push(
          <SupplierTableInput
            key={`row-${i}`}
            index={i}
            dataLength={dataLength}
            onDataLengthChange={handleDataChange}
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            category={category}
            subCategory={subCategory}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            editingSlug={editingSlug}
          />
        );
      }
      setRows(newRows);
      setIsDataCatched(true);
    }
  }, [formData, setIsDataCatched]);

  useEffect(() => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      if (editIndex < updatedRows.length) {
        // Update the specific row at the given index
        updatedRows[editIndex] = (
          <SupplierTableInput
            key={`row-${dataLength}`}
            index={dataLength}
            dataLength={dataLength}
            onDataLengthChange={handleDataChange}
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            category={category}
            subCategory={subCategory}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            editingSlug={editingSlug}
          />
        );
      } else {
        // Add a new row if the dataLength exceeds the current row count
        updatedRows.push(
          <SupplierTableInput
            key={`row-${dataLength}`}
            index={dataLength}
            dataLength={dataLength}
            onDataLengthChange={handleDataChange}
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            category={category}
            subCategory={subCategory}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            editingSlug={editingSlug}
          />
        );
      }
      return updatedRows;
    });
  }, [
    editIndex,
    dataLength,
    category,
    editingSlug,
    formData,
    subCategory,
    categories,
  ]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const refetchDataAndCacheCategory = (category) => {
    setCategory(category);
    setSubCategory(null);
    console.log("category fetched");
    refetchShops({
      categoryId: category != null ? category.id : "",
      subCategoryId: "",
    });
  };

  const refetchDataAndCacheSubCategory = (subCategory, category) => {
    setCategory(category);
    setSubCategory(subCategory);
    console.log("subcategory fetched");
    refetchShops({
      categoryId: "",
      subCategoryId: subCategory != null ? subCategory.id : "",
    });
  };
  return (
    <Content
      pageTitle={"Supplier"}
      tableTitle={"Supplier"}
      navBar={<SupplierNavBar />}
      dataTable={<DataTable theads={theads} tRows={rows} />}
      dataLength={dataLength}
      bottomNavBtns={bottomNavBtns}
      detail={<SupplierDetail />}
      width="w-4.1w"
    />
  );
};
