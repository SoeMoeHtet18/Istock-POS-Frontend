import React from "react";
import clsx from "clsx";

const DataTable = ({ theads, tRows }) => {
  return (
    <div className="h-full relative overflow-y-auto">
      <div className="w-full h-full absolute top-0">
        <table className="w-full mx-auto text-left table-fixed">
          <thead className="bg-primary-200 w-full sticky top-0">
            <tr className="w-full">
              {theads.map((thead, index) => (
                <th
                  key={thead.title}
                  className={clsx(
                    index === 0 && "pl-1",
                    index === theads.length - 1 && "pr-1",
                    thead.center ? "text-center" : "text-left"
                  )}
                  style={{ width: thead.width }}
                >
                  {thead.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="overflow-y-auto" style={{ height: "50%" }}>
            {tRows}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
