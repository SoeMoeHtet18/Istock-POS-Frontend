function Footer() {
  const tabs = [
    {
      title: "New: F7",
      type: "create",
      dataType: "shop",
    },
    {
      title: "Edit: F6",
      type: "edit",
      dataType: "shop",
    },
    {
      title: "Del: F8",
      type: "del",
      dataType: "shop",
    },
    {
      title: "Find: F3",
      type: "find",
      dataType: "shop",
    },
  ];
  return (
    <div className="flex fixed bottom-px space-x-1 pl-1">
      {tabs.map((tab) => (
        <div
          key={tab.type + "_" + tab.dataType}
          dataType={tab.dataType}
          className="bg-white border border-b-0 px-2 py-1 cursor-pointer rounded-t "
        >
          <span className="text-xs">{tab.title}</span>
        </div>
      ))}
    </div>
  );
}

export default Footer;
