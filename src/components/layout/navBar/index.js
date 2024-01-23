const NavItem = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center mx-2 cursor-pointer">
      <img src={icon} width={20} height={20} alt={text} />
      <span className="text-xs mt-1">{text}</span>
    </div>
  );
};

function NavBar() {
  return (
    <div className="flex justify-end pt-3 w-full h-1h">
      <NavItem icon="/icons/help.png" text="Help" />
      <NavItem icon="/icons/hosting.png" text="Year End" />
      <NavItem icon="/icons/database.png" text="Restore" />
      <NavItem icon="/icons/backup.png" text="Back Up" />
      <NavItem icon="/icons/settings.png" text="Set Up" />
      <NavItem icon="/icons/document.png" text="Report" />
      <NavItem icon="/icons/swipe-right.png" text="Log Out" />
    </div>
  );
}

export default NavBar;
