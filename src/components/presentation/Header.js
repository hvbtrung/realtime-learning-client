import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  Stack,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  Box,
  TextField,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotificationContext } from "../../hooks/useNotificationContext";
import CustomizedSnackbars from "../notification/snackbars";

export function HeaderPres() {
  const { isReload, setIsReload } = useAuthContext();
  const {
    setTypeNotification,
    setMessageNotification,
    isAppearNotification,
    setIsAppearNotification,
    typeNotification,
    messageNotification,
  } = useNotificationContext();

  const [isOpenCreationPresDialog, setIsOpenCreationPresDialog] =
    useState(null);
  const [namePresentation, setNamePresentation] = useState("");
  const [error, setError] = useState("");

  const openCreatePresDialog = Boolean(isOpenCreationPresDialog);

  const closeCreationPresDialog = () => {
    setIsOpenCreationPresDialog(null);
    setError("");
  };

  const submitCreateNewPresentation = async () => {
    // const SERVER_DOMAIN = process.env.REACT_APP_API_URL;

    // const res = await axios.post(
    //   `${SERVER_DOMAIN}/api/presentations`,
    //   {
    //     data: {
    //       titlePresentation: namePresentation.trim(),
    //     },
    //   },
    //   {
    //     withCredentials: true,
    //     validateStatus: () => true,
    //   }
    // );

    const res = await axiosInstance.post(`/api/presentations`, {
      data: {
        titlePresentation: namePresentation.trim(),
      },
    });

    setTypeNotification(res.data.status);
    setMessageNotification(res.data.message);
    setIsAppearNotification(!isAppearNotification);
    setIsReload(!isReload);
  };

  const isValidNamePresentation = () => {
    if (namePresentation.trim().length === 0) {
      return setError("Please fill out all of the field");
    } else if (namePresentation.trim().length > 100) {
      return setError("Name of presentation must be less than 100 characters");
    }

    closeCreationPresDialog();
    submitCreateNewPresentation();
  };

  return (
    <div className="container">
      {typeNotification && (
        <CustomizedSnackbars
          type={typeNotification}
          status={isAppearNotification}
          message={messageNotification}
        />
      )}
      <Typography variant="h6" gutterBottom>
        My presentations
      </Typography>
      <Stack spacing={2} sx={{ pt: "15px" }} direction="row">
        <Button
          variant="outlined"
          onClick={(event) => {
            setIsOpenCreationPresDialog(event.currentTarget);
          }}
        >
          New Presentation
        </Button>
      </Stack>

      <Dialog open={openCreatePresDialog}>
        <DialogTitle sx={{ pb: 1 }}>Create New Presentation</DialogTitle>
        <Box sx={{ pl: 5, pr: 5, pt: -2 }}>
          <div
            style={{ height: "20px", marginBottom: "15px", color: "#ae2012" }}
          >
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
          <Button sx={{ color: "#6c757d" }} onClick={closeCreationPresDialog}>
            Cancel
          </Button>
          <Button onClick={isValidNamePresentation}>CREATE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
