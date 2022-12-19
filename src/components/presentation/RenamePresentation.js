import * as React from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Box,
  TextField,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotificationContext } from "../../hooks/useNotificationContext";

export default function RenameDialog({
  openRenamDialog,
  closeRenameDialogFunc,
  prevNamePresentation,
  idPresentation,
}) {
  const {
    typeNotification,
    setTypeNotification,
    setMessageNotification,
    isAppearNotification,
    setIsAppearNotification,
  } = useNotificationContext();

  const { isReload, setIsReload } = useAuthContext();
  const [namePresentation, setNamePresentation] =
    useState(prevNamePresentation);
  const [error, setError] = useState("");

  const submitUpdatePresentation = async () => {
    // const SERVER_DOMAIN = process.env.REACT_APP_API_URL;

    // const res = await axios.put(
    //   `${SERVER_DOMAIN}/api/presentations`,
    //   {
    //     data: {
    //       titlePresentation: namePresentation.trim(),
    //       presentationId: idPresentation,
    //     },
    //   },
    //   {
    //     withCredentials: true,
    //     validateStatus: () => true,
    //   }
    // );

    const res = await axiosInstance.put(`/api/presentations`, {
      data: {
        titlePresentation: namePresentation.trim(),
        presentationId: idPresentation,
      },
    });

    setTypeNotification(res.data.status);
    setMessageNotification(res.data.message);
    console.log("prev isAppearNotification", isAppearNotification);
    setIsAppearNotification(!isAppearNotification);
    console.log("isAppearNotification", isAppearNotification, typeNotification);
    setIsReload(!isReload);
  };

  const isValidNamePresentation = () => {
    if (namePresentation.trim().length === 0) {
      return setError("Please fill out all of the field");
    } else if (namePresentation.trim().length > 100) {
      return setError("Name of presentation must be less than 100 characters");
    }

    submitUpdatePresentation();
    closeRenameDialogFunc();
  };
  return (
    <Dialog open={openRenamDialog}>
      <DialogTitle sx={{ pb: 1 }}>Rename Presentation</DialogTitle>
      <Box sx={{ pl: 5, pr: 5, pt: -2 }}>
        <div style={{ height: "20px", marginBottom: "15px", color: "#ae2012" }}>
          {error}
        </div>

        <TextField
          id="outlined-basic"
          label="Presentation's name"
          variant="outlined"
          fullWidth
          sx={{
            mb: 4,
            minWidth: "500px",
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">100</InputAdornment>,
          }}
          value={namePresentation}
          onChange={(e) => {
            setNamePresentation(e.target.value);
            setError("");
          }}
        />
      </Box>
      <DialogActions>
        <Button sx={{ color: "#6c757d" }} onClick={closeRenameDialogFunc}>
          Cancel
        </Button>
        <Button onClick={isValidNamePresentation}>Rename</Button>
      </DialogActions>
    </Dialog>
  );
}
