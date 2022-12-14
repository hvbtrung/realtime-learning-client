import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function DeleteDialog({
  isOpenDelDialog,
  handleCloseDelDialog,
  role,
  handleSubmitDeletion,
}) {
  return (
    <Dialog
      open={isOpenDelDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDelDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delele {role}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete these members
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelDialog} sx={{ color: "#c1121f" }}>
          Cancel
        </Button>
        <Button onClick={handleSubmitDeletion} sx={{ color: "#101000" }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
