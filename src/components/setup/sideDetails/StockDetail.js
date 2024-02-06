import React from "react";
import { TiArrowDownThick } from "react-icons/ti";

export const StockDetail = () => {
  return (
    <>
      <div className="border relative px-2 pt-3 pb-2 mb-3">
        <span className="top-letter">Detail</span>
        <div className="flex">
          <div className="text-xs">
            <div className="flex justify-between py-0.5 h-7">
              <label>Code</label>
              <input type="text" className="w-3/5 border"></input>
            </div>
            <div className="flex justify-between py-0.5 h-7">
              <label>Description</label>
              <input type="text" className="w-3/5 border"></input>
            </div>
            <div className="flex justify-between py-0.5 h-7">
              <label>Short Name</label>
              <input type="text" className="w-3/5 border"></input>
            </div>
            <div className="flex justify-between py-0.5 h-7">
              <label>Category</label>
              <select className="w-3/5 border">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </div>
            <div className="flex justify-between py-0.5 h-7">
              <label>Brand</label>
              <select className="w-3/5 border">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </div>
            <div className="flex justify-between py-0.5 h-7">
              <label>Last Supplier</label>
              <select className="w-3/5 border">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </div>
            <div className="flex justify-between py-0.5 h-7">
              <label>Remark</label>
              <input type="text" className="w-3/5 border"></input>
            </div>
          </div>
          <div className="w-5/12"></div>
        </div>
      </div>
      <div className="flex gap-1">
        <div className="border relative pt-3">
          <span className="top-letter">Reorder and Account</span>
          <div className="flex flex-col">
            <div className="text-xs ps-1">
              <div className="flex justify-between py-0.5 h-7 w-2/3">
                <label>MinQty</label>
                <input type="text" className="w-1/2 border"></input>
              </div>
              <div className="flex justify-between py-0.5 h-7 w-2/3">
                <label>MaxQty</label>
                <input type="text" className="w-1/2 border"></input>
              </div>
              <div className="flex justify-between py-0.5 h-7">
                <div className="flex justify-between w-2/3">
                  <label>Pur.Type</label>
                  <select className="w-1/2 border">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>

                <button className="border flex items-center text-2xs h-6">
                  <TiArrowDownThick /> Reorder
                </button>
              </div>
            </div>

            <div className="p-2 grid grid-2 text-2xs gap-x-2 gap-y-1">
              <div className="flex justify-between items-center">
                <input type="checkbox" />
                <label>Open Price</label>
              </div>
              <div className="flex justify-between items-center">
                <input type="checkbox" />
                <label>Non Stock</label>
              </div>
              <div className="flex justify-between items-center">
                <input type="checkbox" />
                <label>Inactive</label>
              </div>
              <div className="flex justify-between items-center">
                <input type="checkbox" />
                <label>No Tax</label>
              </div>
            </div>
          </div>
        </div>
        <div className="border relative px-2 pt-3">
          <span className="top-letter">Price</span>
          <div className="flex">
            <div className="text-xs">
              <div className="flex justify-between py-0.5 h-7">
                <label>Pur Price</label>
                <input type="text" className="w-3/5 border"></input>
              </div>
              <div className="flex justify-between py-0.5 h-7">
                <label>Sale Price</label>
                <input type="text" className="w-3/5 border"></input>
              </div>
              <div className="flex justify-between py-0.5 h-7">
                <label>Sale 1</label>
                <input type="text" className="w-3/5 border"></input>
              </div>
              <div className="flex justify-between py-0.5 h-7">
                <label>Sale 2</label>
                <input type="text" className="w-3/5 border"></input>
              </div>
              <div className="flex justify-between py-0.5 h-7">
                <label>Sale 3</label>
                <input type="text" className="w-3/5 border"></input>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};
