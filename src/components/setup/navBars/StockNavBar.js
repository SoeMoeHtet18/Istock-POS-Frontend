import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { NavItem } from "../layout/navItem";
import { NavBar } from "../layout/navBar";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../../tools/api-services/categoryApi";
import { useCreateSubCategoryMutation } from "../../../tools/api-services/subCategoryApi";
import { ClassFormDialog } from "../formDialogs/ClassFormDialog";
import { CategoryFormDialog } from "../formDialogs/CategoryFormDialog";
import { MenuItem } from "@mui/material";

export const StockNavBar = ({
  onCategoryClick,
  onSubCategoryClick,
  categories,
  refetchCategories,
}) => {
  const [navItems, setNavItems] = useState([]);
  const [classFormOpen, setClassFormOpen] = useState(false);
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [parentClassId, setParentClassId] = useState(0);

  const [createCategory, { isSuccess }] = useCreateCategoryMutation();

  const [createSubCategory, { isSuccess: subIsSuccess }] =
    useCreateSubCategoryMutation();

  useEffect(() => {
    if (isSuccess || subIsSuccess) {
      refetchCategories();
    }
  }, [isSuccess, subIsSuccess]);

  useEffect(() => {
    setNavItems(categories);
  }, [categories]);

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
      name: "New Class",
      onClick: openClassForm,
    },
    { name: "Print Class", onClick: () => {} },
  ];

  const classOptions = [
    {
      name: "New Class",
      onClick: openClassForm,
    },
    { name: "Edit Class", onClick: () => {} },
    { name: "Delete Class", onClick: () => {}, isBreak: true },
    { name: "New Category", onClick: openCategoryForm },
    { name: "Print Category", onClick: () => {}, isBreak: true },
    { name: "Merge Class", onClick: () => {} },
  ];

  const categoryOptions = [
    {
      name: "New Category",
      onClick: openCategoryForm,
    },
    { name: "Edit", onClick: () => {} },
    { name: "Delete", onClick: () => {}, isBreak: true },
    { name: "Merge Category", onClick: () => {} },
  ];

  const renderNavOptions = () => {
    if (!navItems || navItems.length === 0) return null;

    return navItems.map((item) => (
      <div key={item.name + item.code} className="flex flex-col">
        {/* Categories */}
        <NavItem
          item={item}
          options={classOptions}
          icon={<BiCategoryAlt />}
          classes="ml-4"
          onClick={onCategoryClick}
        />

        {/* Sub-categories */}
        {item.sub_categories?.length > 0 &&
          item.sub_categories.map((sub_item) => (
            <NavItem
              key={sub_item.name + sub_item.code}
              item={sub_item}
              icon={<MdOutlineCategory />}
              options={categoryOptions}
              classes="ml-8"
              parentItem={item}
              onClick={onSubCategoryClick}
            />
          ))}
      </div>
    ));
  };

  const renderedNavItems = (
    <>
      <NavItem title="Stock" options={titleOptions} icon={<FaHome />} />
      {renderNavOptions()}
    </>
  );

  const { data, error, isLoading } = useGetAllCategoriesQuery();

  const optionsForCategoryForm =
    data &&
    data.map((category) => (
      <MenuItem key={category.id} value={category.id}>
        {`${category.name} - ${category.code}`}
      </MenuItem>
    ));

  const forms = [
    <ClassFormDialog
      key="classForm"
      label="Class"
      open={classFormOpen}
      handleClose={() => setClassFormOpen(false)}
      apiCall={createCategory}
    />,
    <CategoryFormDialog
      key="categoryForm"
      label="Category"
      supLabel="Class"
      supOptions={optionsForCategoryForm}
      open={categoryFormOpen}
      handleClose={() => setCategoryFormOpen(false)}
      apiCall={createSubCategory}
      classId={parentClassId}
    />,
  ];

  return <NavBar navItems={renderedNavItems} formDialogs={forms} />;
};
