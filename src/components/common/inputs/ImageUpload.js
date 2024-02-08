import React, { useEffect, useRef, useState } from "react";
import "./imageUpload.css";
import { IoMdCloudUpload, IoIosCloseCircle } from "react-icons/io";

export const ImageUpload = ({ imageUpload }) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const handleImgChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    imageUpload(e.target.files[0]);
  };

  const openImgUpload = () => {
    document.querySelector(".image-upload").click();
  };

  const removeImage = () => {
    setFile(null);
    imageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="cursor-pointer">
      <input
        ref={fileInputRef}
        type="file"
        className="image-upload"
        onChange={(e) => handleImgChange(e)}
      />
      <div className="flex justify-center">
        {file ? (
          <div className="flex gap-4 flex-col items-center px-2">
            <img src={file} className="max-h-24" alt={file.name} />
            <IoIosCloseCircle color="red" size={20} onClick={removeImage} />
          </div>
        ) : (
          <IoMdCloudUpload color="#B6E4EA" size={90} onClick={openImgUpload} />
        )}
      </div>
    </div>
  );
};
