import { useNavigate } from "react-router-dom";

const NavItem = ({ icon, text, onClick }) => {
  return (
    <button
      className="flex flex-col items-center ml-3 cursor-pointer"
      onClick={onClick}
    >
      <img src={`icons/${icon}`} width={20} height={20} alt={text} />
      <span className="text-xs mt-1">{text}</span>
    </button>
  );
};

function NavBar() {
  const navItems = [
    {
      icon: "clock.png",
      text: "Shift",
      onClick: () => {},
    },
    {
      icon: "delivery.png",
      text: "Delivery",
      onClick: () => {},
    },
    {
      icon: "price-tag.png",
      text: "Price",
      onClick: () => {},
    },
    {
      icon: "help.png",
      text: "Help",
      onClick: () => {},
    },
    {
      icon: "database.png",
      text: "Restore",
      onClick: () => {},
    },
    {
      icon: "backup.png",
      text: "Back Up",
      onClick: () => {},
    },
    {
      icon: "settings.png",
      text: "Set Up",
      onClick: () => navigateTo("/setup"),
    },
    {
      icon: "document.png",
      text: "Report",
      onClick: () => {},
    },
    {
      icon: "logout.png",
      text: "Log Off",
      onClick: () => {},
    },
  ];
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="flex justify-end pt-3 w-full h-1h px-2">
      {navItems.map((item) => (
        <NavItem
          key={item.text}
          icon={item.icon}
          text={item.text}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}

export default NavBar;
