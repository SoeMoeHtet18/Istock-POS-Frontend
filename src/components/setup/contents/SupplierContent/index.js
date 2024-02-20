import React, { useEffect, useState } from "react";
import { Content } from "../../layout/content";
import DataTable from "../../layout/table";
import SupplierTableInput from "../../tableInputs/SupplierTableInput";
import { SupplierDetail } from "../../sideDetails/SupplierDetail";
import { SupplierNavBar } from "../../navBars/SupplierNavBar";
import {
  useCreateSupplierMutation,
  useGetAllSuppliersQuery,
} from "../../../../tools/api-services/supplierApi";
import { useGetAllTownshipsWithSuppliersQuery } from "../../../../tools/api-services/townshipApi";
import { useLocation } from "react-router-dom";

export const SupplierContent = () => {
  const [dataLength, setDataLength] = useState(0);
  const [formData, setFormData] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [editingSlug, setEditingSlug] = useState(null);
  const [isDataCached, setIsDataCached] = useState(false);
  const [townshipId, setTownshipId] = useState(null);
  const path = useLocation().pathname;

  const { data: townships } = useGetAllTownshipsWithSuppliersQuery();

  const {
    data: suppliers,
    isSuccess: isSuppliersFetched,
    refetch: refetchSuppliers,
  } = useGetAllSuppliersQuery();

  const [createSupplier] = useCreateSupplierMutation();

  useEffect(() => {
    if (path === "/setup/supplier") {
      refetchSuppliers();
    }
  }, [path]);

  useEffect(() => {
    if (suppliers) {
      setFormData(() => ({
        ids: suppliers.map((supplier) => supplier.id) ?? [],
        names: suppliers.map((supplier) => supplier.name) ?? [],
        shorts: suppliers.map((supplier) => supplier.short_name) ?? [],
        addresses: suppliers.map((supplier) => supplier.address) ?? [],
        credits: suppliers.map((supplier) => supplier.is_credit) ?? [],
        consigns: suppliers.map((supplier) => supplier.is_consign) ?? [],
        inactives: suppliers.map((supplier) => supplier.is_inactive) ?? [],
        company_names: suppliers.map((supplier) => supplier.company_name) ?? [],
        township_ids: suppliers.map((supplier) => supplier.township_id) ?? [],
        contacts: suppliers.map((supplier) => supplier.contact) ?? [],
        faxes: suppliers.map((supplier) => supplier.fax) ?? [],
        phones: suppliers.map((supplier) => supplier.phone) ?? [],
        emails: suppliers.map((supplier) => supplier.email) ?? [],
        credit_due_days:
          suppliers.map((supplier) => supplier.credit_due_days) ?? [],
      }));
      setDataLength(suppliers.length);
    }
  }, [suppliers]);

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
    form.append("names", formData.names ? JSON.stringify(formData.names) : []);
    form.append(
      "short_names",
      formData.shorts ? JSON.stringify(formData.shorts) : []
    );
    form.append(
      "addresses",
      formData.addresses ? JSON.stringify(formData.addresses) : []
    );
    form.append(
      "credits",
      formData.credits ? JSON.stringify(formData.credits) : []
    );
    form.append(
      "consigns",
      formData.consigns ? JSON.stringify(formData.consigns) : []
    );
    form.append(
      "inactives",
      formData.inactives ? JSON.stringify(formData.inactives) : []
    );
    form.append(
      "company_names",
      formData.company_names ? JSON.stringify(formData.company_names) : []
    );
    form.append(
      "township_ids",
      formData.township_ids ? JSON.stringify(formData.township_ids) : []
    );
    form.append(
      "contacts",
      formData.contacts ? JSON.stringify(formData.contacts) : []
    );
    form.append("faxes", formData.faxes ? JSON.stringify(formData.faxes) : []);
    form.append(
      "phones",
      formData.phones ? JSON.stringify(formData.phones) : []
    );
    form.append(
      "emails",
      formData.emails ? JSON.stringify(formData.emails) : []
    );

    createSupplier(form);
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
    let supplierCondition;
    if (suppliers) {
      supplierCondition = formData?.ids?.length > 0;
    }

    if (isSuppliersFetched && !isDataCached) {
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
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            editingSlug={editingSlug}
          />
        );
      }
      setRows(newRows);
      setIsDataCached(true);
      if (suppliers && !supplierCondition) {
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
          <SupplierTableInput
            key={`row-${editIndex}`}
            index={editIndex}
            dataLength={dataLength}
            onDataLengthChange={handleDataChange}
            formData={formData}
            setFormData={setFormData}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            editingSlug={editingSlug}
          />
        );

        if (editIndex == dataLength) {
          const nextRowIndex = parseInt(editIndex) + 1;

          updatedRows[nextRowIndex] = (
            <SupplierTableInput
              key={`row-${nextRowIndex}`}
              index={nextRowIndex}
              dataLength={dataLength + 1}
              onDataLengthChange={handleDataChange}
              formData={formData}
              setFormData={setFormData}
              editIndex={editIndex}
              setEditIndex={setEditIndex}
              editingSlug={editingSlug}
            />
          );
        }
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
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            editingSlug={editingSlug}
          />
        );
      }
      return updatedRows;
    });
  }, [editIndex, dataLength, editingSlug, formData]);

  return (
    <Content
      pageTitle={"Supplier"}
      tableTitle={"Supplier"}
      navBar={<SupplierNavBar />}
      dataTable={<DataTable theads={theads} tRows={rows} />}
      dataLength={dataLength}
      bottomNavBtns={bottomNavBtns}
      detail={
        <SupplierDetail
          townships={townships}
          townshipId={townshipId}
          index={editIndex}
          formData={formData}
          setFormData={setFormData}
          setEditingSlug={setEditingSlug}
        />
      }
      width="w-4.1w"
    />
  );
};
