import React, { useEffect, useState } from "react";
import { Content } from "../../layout/content";
import DataTable from "../../layout/table";
import TownshipTableInput from "../../tableInputs/TownshipTableInput";
import { TownshipNavBar } from "../../navBars/TownshipNavBar";
import {
  useCreateTownshipMutation,
  useGetAllTownshipsQuery,
} from "../../../../tools/api-services/townshipApi";
import { useGetAllDivisionsQuery } from "../../../../tools/api-services/divisionApi";
import { useLocation } from "react-router-dom";

export const TownshipContent = () => {
  const [dataLength, setDataLength] = useState(0);
  const [formData, setFormData] = useState({});
  const [divisionID, setDivisionID] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isDataCached, setIsDataCached] = useState(false);
  const path = useLocation().pathname;

  const {
    data: townships,
    error,
    isLoading,
    isSuccess: isTownshipsFetched,
    refetch: refetchTownships,
  } = useGetAllTownshipsQuery({
    divisionId: divisionID ?? "",
  });

  const { data: divisions, refetch: refetchDivisions } =
    useGetAllDivisionsQuery();

  const [createTownship, { isSuccess }] = useCreateTownshipMutation();

  useEffect(() => {
    if (townships) {
      setFormData(() => ({
        ids: townships.map((township) => township.id) ?? [],
        names: townships.map((township) => township.name) ?? [],
        shorts: townships.map((township) => township.short_name) ?? [],
        divisionIds: townships.map((township) => township.division_id) ?? [],
        sortIds: townships.map((township) => township.sort_id) ?? [],
      }));
      setDataLength(townships.length);
    }
  }, [townships]);

  const handleDataChange = (index) => {
    setDataLength((prevDataLength) =>
      prevDataLength === parseInt(index) ? prevDataLength + 1 : prevDataLength
    );
  };

  const theads = [
    { title: "Township", width: "25%" },
    { title: "Short", width: "25%" },
    { title: "Division", width: "25%" },
    { title: "Sort ID", width: "25%" },
  ];

  const [rows, setRows] = useState([]);

  const createBulkTownships = () => {
    const form = new FormData();

    form.append("ids", formData.ids ? JSON.stringify(formData.ids) : []);
    form.append("names", formData.names ? JSON.stringify(formData.names) : []);
    form.append(
      "short_names",
      formData.shorts ? JSON.stringify(formData.shorts) : []
    );
    form.append(
      "division_ids",
      formData.divisionIds ? JSON.stringify(formData.divisionIds) : []
    );
    form.append(
      "sort_ids",
      formData.sortIds ? JSON.stringify(formData.sortIds) : []
    );

    createTownship(form);
  };

  const bottomNavBtns = [
    {
      name: "Confirm",
      key: "F5",
      onClick: createBulkTownships,
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
    setIsDataCached(false);
  }, [townships]);

  useEffect(() => {
    let townshipCondition;
    if (townships) {
      townshipCondition = formData?.ids?.length > 0;
    }
    if (isTownshipsFetched && !isDataCached && divisions) {
      const dataFillLength = dataLength < 10 ? 10 : dataLength;
      const newRows = [];
      for (let i = 0; i <= dataFillLength; i++) {
        newRows.push(
          <TownshipTableInput
            key={`row-${i}`}
            index={i}
            dataLength={dataLength}
            onDataLengthChange={handleDataChange}
            formData={formData}
            setFormData={setFormData}
            categories={divisions}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
          />
        );
      }
      setRows(newRows);
      setIsDataCached(true);
      if (townships && !townshipCondition) {
        setIsDataCached(false);
      }
    }
  }, [formData, setIsDataCached]);

  useEffect(() => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      if (editIndex < updatedRows.length) {
        // Update the specific row at the given index
        updatedRows[editIndex] = (
          <TownshipTableInput
            key={`row-${editIndex}`}
            index={editIndex}
            dataLength={dataLength}
            onDataLengthChange={handleDataChange}
            formData={formData}
            setFormData={setFormData}
            categories={divisions}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
          />
        );

        if (dataLength == editIndex) {
          const nextRowIndex = parseInt(editIndex) + 1;

          updatedRows[nextRowIndex] = (
            <TownshipTableInput
              key={`row-${nextRowIndex}`}
              index={nextRowIndex}
              dataLength={dataLength + 1}
              onDataLengthChange={handleDataChange}
              formData={formData}
              setFormData={setFormData}
              categories={divisions}
              editIndex={editIndex}
              setEditIndex={setEditIndex}
            />
          );
        }
      } else {
        // Add a new row if the dataLength exceeds the current row count
        updatedRows.push(
          <TownshipTableInput
            key={`row-${dataLength}`}
            index={dataLength}
            dataLength={dataLength}
            onDataLengthChange={handleDataChange}
            formData={formData}
            setFormData={setFormData}
            categories={divisions}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
          />
        );
      }
      return updatedRows;
    });
  }, [editIndex, dataLength, formData, divisions]);

  const refetchDataAndCacheCategoryID = (category) => {
    setDivisionID(category.id);
    refetchTownships({
      divisionID: category.id ?? "",
    });
  };

  return (
    <Content
      width={"w-7.5w"}
      pageTitle={"Township"}
      navBar={
        <TownshipNavBar
          onCategoryClick={refetchDataAndCacheCategoryID}
          categories={divisions}
          refetchCategories={refetchDivisions}
        />
      }
      dataTable={<DataTable theads={theads} tRows={rows} />}
      dataLength={dataLength}
      bottomNavBtns={bottomNavBtns}
    />
  );
};
