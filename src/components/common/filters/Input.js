import React from "react";

export const Input = ({ label, isText, width }) => {
  return (
    <div
      className="bg-secondary-100 mx-px rounded-xl text-center"
      style={{ width: width }}
    >
      {isText ? label : <input className="bg-secondary-100" type="text" />}
    </div>
  );
};
