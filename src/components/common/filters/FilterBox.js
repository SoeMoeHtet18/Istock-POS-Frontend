import "./filterContainer.css";
import DropDown from "./Dropdown.js";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { IoTrashBinOutline } from "react-icons/io5";
import { MdLegendToggle } from "react-icons/md";
import styled from "@emotion/styled";
import { Input } from "./Input.js";
import { useState } from "react";

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "0.25rem",
  backgroundColor: "#E5E7EB",
});

function FilterBox() {
  const [isFilterToggle, setIsFilterToggle] = useState(true);
  return (
    <div className="flex justify-between mb-3 bg-primary-100 h-1/2h rounded-xl px-3">
      {isFilterToggle ? (
        <div className="flex-ver-center w-auto overflow-x-auto">
          <span>Filter</span>
          <div className="flex items-center ms-2">
            <Container className="rounded-l-xl">
              <IoMdArrowDropleft />
            </Container>
            <DropDown width="100px" isBorderOff={true} options={["Today"]} />
            <Container className="rounded-r-xl">
              <IoMdArrowDropright />
            </Container>
          </div>
          <DropDown width="100px" options={["Br/Loc"]} />
          <DropDown width="100px" options={["User"]} />
          <DropDown width="150px" options={["Currency"]} />
          <DropDown width="150px" options={["Pay Type"]} />
          <Input label="Code" isText={true} width="100px" />
          <Input label="Description" isText={true} width="200px" />
          <DropDown width="150px" options={["Class/Category"]} />
        </div>
      ) : (
        <div className="flex-ver-center w-auto overflow-x-auto">
          <span className="me-2">Filter</span>
          <DropDown width="100px" options={["Job"]} />
          <DropDown width="100px" options={["Salesmen"]} />
          <DropDown width="150px" options={["Brand"]} />
          <Input label="Remark" isText={true} width="100px" />
          <Input label="Cash Amount" isText={true} width="200px" />
        </div>
      )}
      <div className="flex items-center ms-1">
        <IoTrashBinOutline className="me-1 text-lg cursor-pointer" />
        <MdLegendToggle
          className="text-xl cursor-pointer"
          onClick={() => setIsFilterToggle(!isFilterToggle)}
        />
      </div>
    </div>
  );
}

export default FilterBox;
