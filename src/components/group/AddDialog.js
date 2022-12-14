import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export function AddDialog({
  isOpenAddDialog,
  handleCloseAddDialog,
  handleSubmitAddition,
  role,
  email,
  error,
  setEmail,
  setError,
}) {
  return (
    <Dialog open={isOpenAddDialog} onClose={handleCloseAddDialog}>
      <DialogTitle sx={{ pb: 0 }}>Add {role}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ minWidth: "500px" }}>
          {error || "Please enter member's email which is added to this field!"}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#101000" }} onClick={handleCloseAddDialog}>
          Cancel
        </Button>
        <Button onClick={handleSubmitAddition}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
