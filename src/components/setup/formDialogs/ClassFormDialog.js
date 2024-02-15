import React, { useRef } from "react";
import { FormDialog } from "../layout/formDialog";
import { TextField } from "@mui/material";

export const ClassFormDialog = ({
  label,
  open,
  handleClose,
  apiCall,
  isCodeRequired = true,
}) => {
  const nameRef = useRef(null);
  const codeRef = useRef(null);

  const labelName = `${label} Name`;

  const inputs = [
    <TextField
      autoFocus
      required
      margin="dense"
      id="name"
      name="name"
      label={labelName}
      type="text"
      fullWidth
      variant="standard"
      key="name"
    />,
    isCodeRequired && (
      <TextField
        autoFocus
        required
        margin="dense"
        id="code"
        name="code"
        label="Sort Code"
        type="text"
        fullWidth
        variant="standard"
        key="code"
      />
    ),
  ];
  return (
    <div>
      <FormDialog
        open={open}
        handleClose={handleClose}
        apiCall={apiCall}
        inputs={inputs}
        type={labelName}
      />
    </div>
  );
};
