import clsx from "clsx";
import "./dropDown.css";

function DropDown({ width, isBorderOff = false, options }) {
  return (
    <div
      className={clsx(
        "bg-gray-200 mx-px text-center",
        isBorderOff ? "rounded-0" : "rounded-xl"
      )}
      style={{ width: width }}
    >
      <select className="bg-secondary-100">
        {options.map((option, index) => (
          <option key={option} selected={index == 0} disabled={index == 0}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
