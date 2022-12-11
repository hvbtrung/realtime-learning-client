import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Slide,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import * as React from "react";
import axios from "axios";
import { useNotificationContext } from "../../hooks/useNotificationContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog({
  openDelDialog,
  closeDelDialogFunc,
  namePresentation,
  idPresentation,
}) {
  const {
    setTypeNotification,
    setMessageNotification,
    isAppearNotification,
    setIsAppearNotification,
  } = useNotificationContext();

  const { isReload, setIsReload } = useAuthContext();

  const submitDeletePresentation = async () => {
    const SERVER_DOMAIN = process.env.REACT_APP_API_URL;

    const res = await axios.delete(
      `${SERVER_DOMAIN}/api/presentations/${idPresentation}`,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    closeDelDialogFunc();
    setTypeNotification(res.data.status);
    setMessageNotification(res.data.message);
    setIsAppearNotification(!isAppearNotification);
    setIsReload(!isReload);
  };

  return (
    <Dialog
      open={openDelDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDelDialogFunc}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delele Presentation </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete {namePresentation}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDelDialogFunc} sx={{ color: "#c1121f" }}>
          Cancel
        </Button>
        <Button onClick={submitDeletePresentation} sx={{ color: "#101000" }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
