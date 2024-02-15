import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { NavItem } from "../layout/navItem";
import { NavBar } from "../layout/navBar";
import { ClassFormDialog } from "../formDialogs/ClassFormDialog";
import { useCreateDivisionMutation } from "../../../tools/api-services/divisionApi";

export const TownshipNavBar = ({
  onCategoryClick,
  categories,
  refetchCategories,
}) => {
  const [navItems, setNavItems] = useState([]);
  const [classFormOpen, setClassFormOpen] = useState(false);
  const [createDivision, { isSuccess }] = useCreateDivisionMutation();

  useEffect(() => {
    if (isSuccess) {
      refetchCategories();
    }
  }, [isSuccess]);

  useEffect(() => {
    setNavItems(categories);
  }, [categories]);

  const openClassForm = () => setClassFormOpen(true);

  const titleOptions = [
    {
      name: "New Division",
      onClick: openClassForm,
    },
    // { name: "Print Division", onClick: () => {} },
  ];

  const classOptions = [
    {
      name: "New Division",
      onClick: openClassForm,
    },
    { name: "Edit Division", onClick: () => {} },
    { name: "Delete Division", onClick: () => {}, isBreak: true },
    // { name: "Merge Division", onClick: () => {} },
  ];

  const renderNavOptions = () => {
    if (!navItems || navItems.length === 0) return null;

    return navItems.map((item) => (
      <div key={item.name + item.code} className="flex flex-col">
        {/* Townships */}
        <NavItem
          item={item}
          title={item.name}
          options={classOptions}
          icon={<BiCategoryAlt />}
          classes="ml-4"
          onClick={onCategoryClick}
        />
      </div>
    ));
  };

  const renderedNavItems = (
    <>
      <NavItem title="Township" options={titleOptions} icon={<FaHome />} />
      {renderNavOptions()}
    </>
  );

  const forms = [
    <ClassFormDialog
      key="classForm"
      label="Division"
      open={classFormOpen}
      handleClose={() => setClassFormOpen(false)}
      apiCall={createDivision}
      isCodeRequired={false}
    />,
  ];

  return <NavBar navItems={renderedNavItems} formDialogs={forms} />;
};
