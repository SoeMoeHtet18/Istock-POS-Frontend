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
import { useGetAllLocationsQuery } from "../../../../tools/api-services/locationApi";

export const LocationContent = () => {
  const [dataLength, setDataLength] = useState(0);
  const [formData, setFormData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isDataCached, setIsDataCached] = useState(false);

  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [editingSlug, setEditingSlug] = useState("");

  const {
    data: shops,
    isSuccess: isShopsFetched,
    refetch: refetchShops,
  } = useGetAllShopsQuery();
  const { data: branches, refetch: refetchBranches } = useGetAllBranchesQuery();
  const { data: locations, refetch: refetchLocations } =
    useGetAllLocationsQuery();

  const [createShop, { isSuccess }] = useCreateShopMutation();

  const createBulkShops = () => {
    const form = new FormData();

    form.append("ids", formData.ids ? JSON.stringify(formData.ids) : []);
    form.append("names", formData.names ? JSON.stringify(formData.names) : []);
    form.append(
      "short_names",
      formData.shorts ? JSON.stringify(formData.shorts) : []
    );
    form.append(
      "branches",
      formData.branches ? JSON.stringify(formData.branches) : []
    );
    form.append(
      "locations",
      formData.locationGroups ? JSON.stringify(formData.locationGroups) : []
    );
    form.append(
      "sortCodes",
      formData.sortCodes ? JSON.stringify(formData.sortCodes) : []
    );
    form.append(
      "diffSPs",
      formData.diffSPs ? JSON.stringify(formData.diffSPs) : []
    );

    createShop(form);
  };

  useEffect(() => {
    if (shops) {
      const newFormData = {
        ids: shops.map((shop) => shop.id),
        names: shops.map((shop) => shop.name),
        shorts: shops.map((shop) => shop.short_name),
        branches: shops.map((shop) => shop.branch_id),
        locationGroups: shops.map((shop) => shop.location_id),
        sortIds: shops.map((shop) => shop.sort_id),
        diffSPs: shops.map((shop) => shop.brand),
      };
      setFormData(newFormData);
      setDataLength(shops.length);
      setIsDataCached(false);
    }
  }, [shops]);

  const handleDataChange = (index) => {
    setDataLength((prevDataLength) =>
      prevDataLength === parseInt(index) ? prevDataLength + 1 : prevDataLength
    );
  };

  const theads = [
    { title: "Name", width: "20%" },
    { title: "Short", width: "15%" },
    { title: "Branch", width: "20%" },
    { title: "Location Group", width: "20%" },
    { title: "Sort Code", width: "20%" },
    { title: "Diff SP", width: "5%" },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (isShopsFetched && !isDataCached && branches && locations) {
      console.log("data is not cached, so cache it now");
      const dataFillLength = dataLength < 10 ? 10 : dataLength;
      const newRows = [];
      for (let i = 0; i <= dataFillLength; i++) {
        newRows.push(
          <LocationTableInput
            key={`row-${i}`}
            index={i}
            dataLength={dataLength}
            onDataLengthChange={handleDataChange}
            formData={formData}
            setFormData={setFormData}
            branches={branches}
            locations={locations}
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
    }
  }, [formData, isDataCached, isShopsFetched, branches, locations]);

  useEffect(() => {
    console.log(editIndex, dataLength);
    editIndex !== null &&
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        if (editIndex < updatedRows.length) {
          // Update the specific row at the given index
          updatedRows[editIndex] = (
            <LocationTableInput
              key={`row-${editIndex}`}
              index={editIndex}
              dataLength={dataLength}
              onDataLengthChange={handleDataChange}
              formData={formData}
              setFormData={setFormData}
              branches={branches}
              locations={locations}
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
              <LocationTableInput
                key={`row-${nextRowIndex}`}
                index={nextRowIndex}
                dataLength={dataLength + 1}
                onDataLengthChange={handleDataChange}
                formData={formData}
                setFormData={setFormData}
                branches={branches}
                locations={locations}
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
            <LocationTableInput
              key={`row-${dataLength}`}
              index={dataLength}
              dataLength={dataLength}
              onDataLengthChange={handleDataChange}
              formData={formData}
              setFormData={setFormData}
              categories={branches}
              locations={locations}
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
    branches,
    locations,
  ]);

  const refetchDataAndCacheCategory = (category) => {
    setCategory(category);
    setSubCategory(null);
    console.log("category fetched");
    refetchShops();
  };

  const refetchDataAndCacheSubCategory = (subCategory, category) => {
    setCategory(category);
    setSubCategory(subCategory);
    console.log("subcategory fetched");
    refetchShops();
  };

  return (
    <Content
      width={"w-7.5w"}
      pageTitle={"Location"}
      tableTitle={"Location"}
      navBar={
        <LocationNavBar
          onCategoryClick={refetchDataAndCacheCategory}
          onSubCategoryClick={refetchDataAndCacheSubCategory}
          branches={branches}
          refetchBranches={refetchBranches}
        />
      }
      dataTable={<DataTable theads={theads} tRows={rows} />}
      dataLength={dataLength}
      bottomNavBtns={[
        {
          name: "Confirm",
          key: "F5",
          onClick: createBulkShops,
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
      ]}
    />
  );
};
