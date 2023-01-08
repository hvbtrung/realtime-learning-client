import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { validateEmail } from "../group/Member";
import { useNotificationContext } from "../../hooks/useNotificationContext";
import axiosInstance from "../../utils/axiosInstance";
import { useAuthContext } from "../../hooks/useAuthContext";

export function AddCollaboratorDialog({
  isOpenAddDialog,
  handleCloseAddDialog,
  idPresentation,
}) {
  const { isReload, setIsReload } = useAuthContext();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const {
    setTypeNotification,
    setMessageNotification,
    isAppearNotification,
    setIsAppearNotification,
  } = useNotificationContext();

  const handleSubmitAddition = async () => {
    const result = validateEmail(email);

    if (!result) {
      setError(
        "Your typed email is invalid. Please use a different email address!"
      );
    } else {
      const res = await axiosInstance.post(`/api/presentations/collab`, {
        data: {
          email: email,
          role: "sharedwithme",
          presentationId: idPresentation,
        },
      });

      setTypeNotification(res.data.status);
      setMessageNotification(res.data.message);
      setIsAppearNotification(!isAppearNotification);

      if (res.data.status === "success") {
        handleCloseAddDialog();
        setEmail("");
        setIsReload(!isReload);
      }
    }
  };
  return (
    <Dialog open={isOpenAddDialog} onClose={handleCloseAddDialog}>
      <DialogTitle sx={{ pb: 0 }}>Add Collaborator</DialogTitle>
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
