import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../../../tools/api-services/categoryApi";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { NavItem } from "../navItem";
import { ClassFormDialog } from "../../formDialogs/ClassFormDialog";
import { CategoryFormOpen } from "../../formDialogs/CategoryFormDialog";
import { useCreateSubCategoryMutation } from "../../../../tools/api-services/subCategoryApi";

export const NavBar = ({ title }) => {
  const [navItems, setNavItems] = useState([]);
  const [classFormOpen, setClassFormOpen] = useState(false);
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const { data, refetch: refetchAllCategories } = useGetAllCategoriesQuery();
  const [parentClassId, setParentClassId] = useState(0);

  const [createCategory, { isLoading, isError, isSuccess }] =
    useCreateCategoryMutation();

  const [
    createSubCategory,
    { isLoading: subIsLoading, isError: subIsError, isSuccess: subIsSuccess },
  ] = useCreateSubCategoryMutation();

  useEffect(() => {
    if (isSuccess || subIsSuccess) {
      refetchAllCategories();
    }
  }, [isSuccess, subIsSuccess]);

  useEffect(() => {
    setNavItems(data);
  }, [data]);

  const openClassForm = () => setClassFormOpen(true);
  const openCategoryForm = (e) => {
    const parentClassId = parseInt(e.target.getAttribute("data-id"));
    setParentClassId(parentClassId);
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
        />

        {/* Sub-categories */}
        {item.sub_categories?.length > 0 &&
          item.sub_categories.map((sub_item) => (
            <NavItem
              key={sub_item.id + sub_item.code}
              item={sub_item}
              icon={<MdOutlineCategory />}
              options={categoryOptions}
              classes="ml-8"
              parentItemId={item.id}
            />
          ))}
      </div>
    ));
  };

  return (
    <div className="p-2 border w-1.2w flex-1">
      <div className="flex flex-col">
        {/* Main title */}
        <NavItem title={title} options={titleOptions} icon={<FaHome />} />
        {renderNavOptions()}
      </div>

      <ClassFormDialog
        open={classFormOpen}
        handleClose={() => setClassFormOpen(false)}
        apiCall={createCategory}
      />
      <CategoryFormOpen
        open={categoryFormOpen}
        handleClose={() => setCategoryFormOpen(false)}
        apiCall={createSubCategory}
        classId={parentClassId}
      />
    </div>
  );
};
