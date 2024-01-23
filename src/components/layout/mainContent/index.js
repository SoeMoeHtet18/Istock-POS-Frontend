import Content from "../content";

function MainContent({ tabs }) {
  return (
    <div id="main-content" className="flex-1 w-full">
      <Content tabs={tabs} />
      <div style={{ width: "22vw" }}></div>
    </div>
  );
}

export default MainContent;
