import React, { useEffect, useState } from "react";
import DataTable from "../../layout/table";
import { Content } from "../../layout/content";
import StockTableInput from "../../tableInputs/StockTableInput";
import {
  useCreateStockMutation,
  useGetAllStocksQuery,
} from "../../../../tools/api-services/stockApi";
import { StockNavBar } from "../../navBars/StockNavBar";
import { StockDetail } from "../../sideDetails/StockDetail";
import { useGetAllCategoriesQuery } from "../../../../tools/api-services/categoryApi";
import { useLocation } from "react-router-dom";

export const StockContent = () => {
  const [dataLength, setDataLength] = useState(0);
  const [formData, setFormData] = useState({});
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editingSlug, setEditingSlug] = useState("");
  const [isDataCached, setIsDataCached] = useState(false);
  const path = useLocation().pathname;

  const {
    data: stocks,
    isSuccess: isStockSuccess,
    refetch: refetchStocks,
  } = useGetAllStocksQuery({
    categoryId: category != null ? category.id : "",
    subCategoryId: subCategory != null ? subCategory.id : "",
  });

  const { data: categories, refetch: refetchAllCategories } =
    useGetAllCategoriesQuery();

  const [createStock] = useCreateStockMutation();

  useEffect(() => {
    if (path === "/setup/stock") {
      refetchStocks({ categoryId: "", subCategoryId: "" });
    }
  }, [path]);

  useEffect(() => {
    if (stocks) {
      setFormData(() => ({
        ids: stocks.map((stock) => stock.id) ?? [],
        code: stocks.map((stock) => stock.barcode) ?? [],
        description: stocks.map((stock) => stock.name) ?? [],
        short: stocks.map((stock) => stock.short_name) ?? [],
        categoryIds: stocks.map((stock) => stock.category_id) ?? [],
        subCategoryIds: stocks.map((stock) => stock.sub_category_id) ?? [],
        brand: stocks.map((stock) => stock.brand) ?? [],
        purchaseCurrency: stocks.map((stock) => stock.purchase_currency) ?? [],
        purchasePrice: stocks.map((stock) => stock.purchase_price) ?? [],
        supplierCurrency: stocks.map((stock) => stock.supplier_currency) ?? [],
        salePrice: stocks.map((stock) => stock.sale_price) ?? [],
        salePriceOne: stocks.map((stock) => stock.sale_price_one) ?? [],
        salePriceTwo: stocks.map((stock) => stock.sale_price_two) ?? [],
        salePriceThree: stocks.map((stock) => stock.sale_price_three) ?? [],
        gp: stocks.map((stock) => stock.gp) ?? [],
        image: stocks.map((stock) => stock.image) ?? [],
      }));
      setDataLength(stocks.length);
      setIsDataCached(false);
    }
  }, [stocks]);

  const handleDataChange = (index) => {
    setDataLength((prevDataLength) =>
      prevDataLength === parseInt(index) ? prevDataLength + 1 : prevDataLength
    );
  };

  const theads = [
    { title: "Code", width: "14%" },
    { title: "Description", width: "20%" },
    { title: "Short", width: "10%" },
    { title: "Category", width: "10%" },
    { title: "PCurr", width: "8%" },
    { title: "PurPrice", width: "15%" },
    { title: "SCurr", width: "8%" },
    { title: "Sale Price", width: "15%" },
    { title: "GP", width: "5%" },
  ];

  const [rows, setRows] = useState([]);

  const createBulkStocks = () => {
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

    createStock(form);
  };

  const bottomNavBtns = [
    {
      name: "Confirm",
      key: "F5",
      onClick: createBulkStocks,
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
    let stockCondition;
    if (stocks) {
      stockCondition = formData?.ids?.length > 0;
    }

    if (isStockSuccess && !isDataCached && categories) {
      const dataFillLength = dataLength < 10 ? 10 : dataLength;
      const newRows = [];
      for (let i = 0; i <= dataFillLength; i++) {
        newRows.push(
          <StockTableInput
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
      setIsDataCached(true);
      if (stocks && !stockCondition) {
        setIsDataCached(false);
      }
    }
  }, [formData, isDataCached]);

  useEffect(() => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      if (editIndex < updatedRows.length) {
        // Update the specific row at the given index
        updatedRows[editIndex] = (
          <StockTableInput
            key={`row-${editIndex}`}
            index={editIndex}
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

        if (dataLength == editIndex) {
          const nextRowIndex = parseInt(editIndex) + 1;

          updatedRows[nextRowIndex] = (
            <StockTableInput
              key={`row-${nextRowIndex}`}
              index={nextRowIndex}
              dataLength={dataLength + 1}
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
      } else {
        // Add a new row if the dataLength exceeds the current row count
        updatedRows.push(
          <StockTableInput
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

  const refetchDataAndCacheCategory = (category) => {
    setCategory(category);
    setSubCategory(null);
    refetchStocks({
      categoryId: category != null ? category.id : "",
      subCategoryId: "",
    });
  };

  const refetchDataAndCacheSubCategory = (subCategory, category) => {
    setCategory(category);
    setSubCategory(subCategory);
    refetchStocks({
      categoryId: "",
      subCategoryId: subCategory != null ? subCategory.id : "",
    });
  };

  return (
    <Content
      pageTitle={"Stock"}
      tableTitle={"Stock List"}
      navBar={
        <StockNavBar
          onCategoryClick={refetchDataAndCacheCategory}
          onSubCategoryClick={refetchDataAndCacheSubCategory}
          categories={categories}
          refetchCategories={refetchAllCategories}
        />
      }
      dataTable={<DataTable theads={theads} tRows={rows} />}
      dataLength={dataLength}
      detail={
        <StockDetail
          categories={categories}
          category={category}
          subCategory={subCategory}
          index={editIndex}
          formData={formData}
          setFormData={setFormData}
          setEditingSlug={setEditingSlug}
        />
      }
      bottomNavBtns={bottomNavBtns}
      switchBtn={
        <button className="text-red-500 border w-min px-3">Brand</button>
      }
    />
  );
};
