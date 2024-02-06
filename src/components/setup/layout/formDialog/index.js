import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const FormDialog = ({ open, handleClose, apiCall, inputs, type }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());

          const name = formJson.name;
          const code = formJson.code;
          const classId = formJson.classId;

          let body;

          if (classId) {
            body = {
              name: name,
              code: code,
              category_id: classId,
            };
          } else {
            body = {
              name: name,
              code: code,
            };
          }

          apiCall(body);
          handleClose();
        },
      }}
    >
      <DialogTitle>Create New {type}</DialogTitle>
      <DialogContent>{inputs}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
