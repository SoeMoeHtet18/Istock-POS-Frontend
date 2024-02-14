import React from "react";
import { FormDialog } from "../layout/formDialog";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useGetAllCategoriesQuery } from "../../../tools/api-services/categoryApi";

export const CategoryFormDialog = ({
  label,
  supLabel,
  supOptions,
  open,
  handleClose,
  apiCall,
  classId,
}) => {
  const inputs = [
    <TextField
      key="name"
      autoFocus
      required
      margin="dense"
      id="name"
      name="name"
      label={`${label} Name`}
      type="text"
      fullWidth
      variant="standard"
    />,
    <FormControl key="classSelect" fullWidth variant="standard" required>
      <InputLabel id="demo-simple-select-label">{supLabel} Name</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="classId"
        label="Class Name"
        value={classId}
      >
        {supOptions}
      </Select>
    </FormControl>,
    <TextField
      key="code"
      autoFocus
      required
      margin="dense"
      id="code"
      name="code"
      label="Sort Code"
      type="text"
      fullWidth
      variant="standard"
    />,
  ];

  return (
    <div>
      <FormDialog
        open={open}
        handleClose={handleClose}
        apiCall={apiCall}
        inputs={inputs}
        type={"Category"}
      />
    </div>
  );
};
