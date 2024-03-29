import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { NavItem } from "../layout/navItem";
import { NavBar } from "../layout/navBar";
import { ClassFormDialog } from "../formDialogs/ClassFormDialog";
import { CategoryFormDialog } from "../formDialogs/CategoryFormDialog";
import {
  useCreateBranchMutation,
  useGetAllBranchesQuery,
} from "../../../tools/api-services/branchApi";
import { useCreateLocationMutation } from "../../../tools/api-services/locationApi";
import { MenuItem } from "@mui/material";

export const LocationNavBar = ({
  onCategoryClick,
  onSubCategoryClick,
  branches,
  refetchBranches,
}) => {
  const [navItems, setNavItems] = useState([]);
  const [classFormOpen, setClassFormOpen] = useState(false);
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [parentClassId, setParentClassId] = useState(0);

  const [createBranch, { isSuccess }] = useCreateBranchMutation();

  const [createLocation, { isSuccess: subIsSuccess }] =
    useCreateLocationMutation();

  useEffect(() => {
    if (isSuccess || subIsSuccess) {
      refetchBranches();
    }
  }, [isSuccess, subIsSuccess]);

  useEffect(() => {
    setNavItems(branches);
  }, [branches]);

  const openClassForm = () => setClassFormOpen(true);
  const openCategoryForm = (e) => {
    if (e.target) {
      const parentClassId = parseInt(e.target.getAttribute("data-id"));
      setParentClassId(parentClassId);
    }
    setCategoryFormOpen(true);
  };

  const titleOptions = [
    {
      name: "New Branch",
      onClick: openClassForm,
    },
    // { name: "Print Branch", onClick: () => {} },
  ];

  const classOptions = [
    {
      name: "New Branch",
      onClick: openClassForm,
    },
    { name: "Edit Branch", onClick: () => {} },
    { name: "Delete Branch", onClick: () => {}, isBreak: true },
    { name: "New Location Group", onClick: openCategoryForm },
    // { name: "Print Location Group", onClick: () => {}, isBreak: true },
    // { name: "Merge Branch", onClick: () => {} },
  ];

  const categoryOptions = [
    {
      name: "New Location Group",
      onClick: openCategoryForm,
    },
    { name: "Edit", onClick: () => {} },
    { name: "Delete", onClick: () => {}, isBreak: true },
    // { name: "Merge Location Group", onClick: () => {} },
  ];

  const renderNavOptions = () => {
    if (!navItems || navItems.length === 0) return null;

    return navItems.map((item) => (
      <div key={item.name + item.code} className="flex flex-col">
        {/* Branches */}
        <NavItem
          item={item}
          options={classOptions}
          icon={<BiCategoryAlt className="class-icon" />}
          classes="ml-4"
          onClick={onCategoryClick}
        />

        {/* Location Groups */}
        {item.locations?.length > 0 &&
          item.locations.map((sub_item) => (
            <NavItem
              key={sub_item.name + sub_item.code}
              item={sub_item}
              icon={<MdOutlineCategory className="class-icon" />}
              options={categoryOptions}
              classes="ml-8"
              parentItem={item}
              onClick={onSubCategoryClick}
              title={sub_item.name}
            />
          ))}
      </div>
    ));
  };

  const renderedNavItems = (
    <>
      <NavItem title="Branch" options={titleOptions} icon={<FaHome />} />
      {renderNavOptions()}
    </>
  );

  const { data, error, loading } = useGetAllBranchesQuery();

  const optionsForCategoryForm =
    data &&
    data.map((branch) => (
      <MenuItem key={branch.id} value={branch.id}>
        {`${branch.name} - ${branch.code}`}
      </MenuItem>
    ));

  const forms = [
    <ClassFormDialog
      key="classForm"
      label="Branch"
      open={classFormOpen}
      handleClose={() => setClassFormOpen(false)}
      apiCall={createBranch}
    />,
    <CategoryFormDialog
      key="categoryForm"
      label="Location Group"
      supLabel="Branch"
      supOptions={optionsForCategoryForm}
      open={categoryFormOpen}
      handleClose={() => setCategoryFormOpen(false)}
      apiCall={createLocation}
      classId={parentClassId}
    />,
  ];

  return <NavBar navItems={renderedNavItems} formDialogs={forms} />;
};
