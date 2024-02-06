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

export const CategoryFormOpen = ({ open, handleClose, apiCall, classId }) => {
  const { data, error, isLoading } = useGetAllCategoriesQuery();

  const categoryOptions =
    data &&
    data.map((category) => (
      <MenuItem key={category.id} value={category.id}>
        {`${category.name} - ${category.code}`}
      </MenuItem>
    ));

  const inputs = [
    <TextField
      key="name"
      autoFocus
      required
      margin="dense"
      id="name"
      name="name"
      label="Category Name"
      type="text"
      fullWidth
      variant="standard"
    />,
    <FormControl key="classSelect" fullWidth variant="standard" required>
      <InputLabel id="demo-simple-select-label">Class Name</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="classId"
        label="Class Name"
        value={classId}
      >
        {categoryOptions}
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
