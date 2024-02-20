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
import { useCreateTownshipMutation } from "../../../tools/api-services/townshipApi";

export const SupplierNavBar = ({
  onCategoryClick,
  onSubCategoryClick,
  townships,
  refetchTownships,
}) => {
  const [navItems, setNavItems] = useState([]);
  const [classFormOpen, setClassFormOpen] = useState(false);
  const [parentClassId, setParentClassId] = useState(0);

  const [createTownship, { isSuccess }] = useCreateTownshipMutation();

  useEffect(() => {
    if (isSuccess) {
      refetchTownships();
    }
  }, [isSuccess]);

  useEffect(() => {
    setNavItems(townships);
  }, [townships]);

  const openClassForm = () => setClassFormOpen(true);

  const titleOptions = [
    {
      name: "New Township",
      onClick: openClassForm,
    },
    { name: "Print Township", onClick: () => {} },
  ];

  const classOptions = [
    {
      name: "New Township",
      onClick: openClassForm,
    },
    { name: "Edit Township", onClick: () => {} },
    { name: "Delete Township", onClick: () => {}, isBreak: true },
    // { name: "Merge Branch", onClick: () => {} },
  ];

  const renderNavOptions = () => {
    if (!navItems || navItems.length === 0) return null;

    return navItems.map((item) => (
      <div key={item.name} className="flex flex-col">
        {/* Branches */}
        <NavItem
          item={item}
          options={classOptions}
          icon={<BiCategoryAlt />}
          classes="ml-4"
          onClick={onCategoryClick}
          title={item.name}
        />
      </div>
    ));
  };

  const renderedNavItems = (
    <>
      <NavItem title="Supplier" options={titleOptions} icon={<FaHome />} />
      {renderNavOptions()}
    </>
  );

  const { data, error, loading } = useGetAllBranchesQuery();

  const forms = [
    <ClassFormDialog
      label="Township"
      open={classFormOpen}
      handleClose={() => setClassFormOpen(false)}
      apiCall={createTownship}
    />,
  ];

  return <NavBar navItems={renderedNavItems} formDialogs={forms} />;
};
