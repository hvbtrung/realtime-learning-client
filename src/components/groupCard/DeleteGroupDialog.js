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
import axiosInstance from "../../utils/axiosInstance";
import { useAuthContext } from "../../hooks/useAuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteGroupCardDialog({
  openDelDialog,
  closeDelDialogFunc,
  nameGroup,
  idGroup,
  setStatus,
  setNoti,
  setMessage,
  noti,
}) {
  const { isReload, setIsReload } = useAuthContext();

  const submitDeleteGroup = async () => {
    const res = await axiosInstance.delete(`/api/groups/${idGroup}`);

    console.log("res", res);

    if (res.data.status === "success") {
      closeDelDialogFunc();
      setIsReload(!isReload);
    } else {
      closeDelDialogFunc();
      setStatus("error");
      setMessage(res.data.message);
    }

    setNoti(!noti);
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
          Are you sure you want to delete {nameGroup}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDelDialogFunc} sx={{ color: "#c1121f" }}>
          Cancel
        </Button>
        <Button onClick={submitDeleteGroup} sx={{ color: "#101000" }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
