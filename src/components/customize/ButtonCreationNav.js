import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import CustomizedSnackbars from "../notification/snackbars";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ButtonCreation() {
  const { user } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorNG, setAnchorNG] = React.useState(null);
  const [nameGroup, setnameGroup] = React.useState("");
  const [shortDesc, setShortDesc] = React.useState("");
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");

  const open = Boolean(anchorEl);
  const openNG = Boolean(anchorNG);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleCloseNG = () => {
    setAnchorNG(null);
    setError("");
  };

  const handleValidation = () => {
    if (nameGroup.trim().length == 0 || shortDesc.trim().length == 0) {
      setError("Please fill out all of the field");
      return;
    }

    handleCloseNG();
    submit();
  };

  const submit = async () => {
    const url = process.env.REACT_APP_API_URL;
    console.log("url", url);

    const response = await axios.post(`${url}/api/group`, {
      data: {
        nameGroup: nameGroup.trim(),
        shortDesc: shortDesc.trim(),
        user: user._id,
      },
      withCredentials: true,
      validateStatus: () => true,
    });

    console.log("response: ", response);
    const json = response.data;

    if (json.status == "success") {
      setStatus("success");
    } else if (json.status == "error") {
      setStatus("error");
    }
  };

  return (
    <span>
      {status === "success" && (
        <CustomizedSnackbars
          type="success"
          message="Creating a new groupp successfully"
        />
      )}
      {status === "error" && (
        <CustomizedSnackbars
          type="error"
          message="Creating a group failure, please try again!"
        />
      )}

      <Fab
        color="primary"
        aria-label="add"
        size="small"
        sx={{ boxShadow: 0 }}
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={(event) => {
            handleClose(event);
            setAnchorNG(event.currentTarget);
          }}
          id="joinBtn"
        >
          Create Group
        </MenuItem>
        <MenuItem onClick={handleClose} id="createBtn">
          Join Group
        </MenuItem>
      </Menu>

      {/* CREATION - GROUP - FORM */}
      <Dialog open={openNG} onClose={handleClose}>
        <DialogTitle sx={{ pb: 1 }}>CREATE GROUP</DialogTitle>
        <Box sx={{ pl: 5, pr: 5, pt: -2 }}>
          <div
            style={{ height: "20px", marginBottom: "15px", color: "#ae2012" }}
          >
            {error}
          </div>

          <TextField
            id="outlined-basic"
            label="Group's name"
            variant="outlined"
            fullWidth
            sx={{
              mb: 4,
            }}
            value={nameGroup}
            onChange={(e) => {
              setnameGroup(e.target.value);
              setError("");
            }}
          />
          <TextField
            id="outlined-basic"
            label="Short Description"
            variant="outlined"
            fullWidth
            value={shortDesc}
            onChange={(e) => {
              setShortDesc(e.target.value);
              setError("");
            }}
          />
        </Box>

        <DialogActions>
          <Button sx={{ color: "#101010" }} onClick={handleCloseNG}>
            Cancel
          </Button>
          <Button onClick={handleValidation}>CREATE</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
