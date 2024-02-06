export const NavBar = ({ navItems, formDialogs }) => {
  return (
    <div id="setUpNavBar" className="p-2 border w-1.2w flex-1 overflow-auto">
      <div className="flex flex-col">{navItems}</div>

      {formDialogs}
    </div>
  );
};
