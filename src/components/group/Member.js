import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Item from "./Item";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { useAuthContext } from "../../hooks/useAuthContext";
import CustomizedSnackbars from "../notification/snackbars";
import { useDetailGrContext } from "../../hooks/useDetailGrContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Member({ members, role, itsRole }) {
  const { user } = useAuthContext();
  const [email, setEmail] = React.useState("");
  const [isOpenAddDialog, setIsOpenAddDialog] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isCheckAll, setIsCheckAll] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState([]);
  const [isDel, setIsDel] = React.useState(false);
  const [isOpenDelDialog, setIsOpenDelDialog] = React.useState(false);
  const { callApi, setCallApi } = useDetailGrContext();
  const [status, setStatus] = React.useState(false);
  const [noti, setNoti] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const pathname = window.location.pathname;
  let groupId = pathname.slice(
    "/group/detail-information/".length,
    pathname.length
  );
  let openDelStyle = { backgroundColor: "#dddddd", borderRadius: "2px" };

  const handleOpenAddDialog = () => {
    setIsOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setIsOpenAddDialog(false);
  };

  const handleOpenDelDialog = () => {
    setIsOpenDelDialog(true);
  };

  const handleCloseDelDialog = () => {
    setIsOpenDelDialog(false);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // function add member
  const assignRole = async () => {
    const url = process.env.REACT_APP_API_URL;

    if (role === "Co-Owner") {
      role = "ROLE_COOWNER";
    } else {
      role = "ROLE_MEMBER";
    }

    const response = await axios.post(`${url}/api/group/assign`, {
      data: {
        ownerId: user._id,
        email: email,
        role: role,
        groupId: groupId,
      },
      withCredentials: true,
      validateStatus: () => true,
    });

    if (response.data.status === "success") {
      setCallApi(!callApi);
      setStatus("success");
      setMessage(response.data.message);
    } else {
      setStatus("error");
      setMessage(response.data.message);
    }

    handleCloseAddDialog();
    setNoti(!noti);
    setIsCheck([]);
  };

  // function delete member
  const detachMember = async () => {
    const url = process.env.REACT_APP_API_URL;

    const response = await axios.post(`${url}/api/group/del-member`, {
      data: {
        userIds: isCheck,
        groupId: groupId,
      },
      withCredentials: true,
      validateStatus: () => true,
    });

    if (response.data.status === "success") {
      setCallApi(!callApi);
      setStatus("success");
      setMessage(response.data.message);
    } else {
      setStatus("error");
      setMessage(response.data.message);
    }
    handleCloseDelDialog();
    setNoti(!noti);
    setIsCheck([]);
    showCheckboxDel();
  };

  // show checkbox select all for deleting members
  const showCheckboxDel = () => {
    if (members.length == 0) {
      setIsDel(false);
    }
    setIsDel(!isDel);
  };

  // handle logic select all
  const handleSelectAll = async () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(members.map((member) => member.userId._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleSubmitAddition = () => {
    const result = validateEmail(email);

    if (!result) {
      setError(
        "Your typed email is invalid. Please use a different email address!"
      );
    } else {
      assignRole();
      setEmail("");
    }
  };

  const handleSubmitDeletion = () => {
    detachMember();
  };

  return (
    <Box m="auto" sx={{ maxWidth: "600px", mb: 5, mt: 2 }}>
      {status === "success" && (
        <CustomizedSnackbars type="success" status={noti} message={message} />
      )}
      {status === "error" && (
        <CustomizedSnackbars type="error" status={noti} message={message} />
      )}
      <Box>
        {/* open/close pop-up assign new role or new member */}
        <Box
          sx={{
            color: "rgb(194,100,1)",
            borderBottom: 0.001,
            borderColor: "rgb(194,100,1)",
            pb: 2,
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">{role}</Typography>

          {itsRole === "ROLE_OWNER" &&
          (role === "Co-Owner" || role === "Member") ? (
            <div>
              {/* button delete */}

              {members.length > 0 ? (
                <MoreVertIcon
                  onClick={showCheckboxDel}
                  style={isDel ? openDelStyle : {}}
                  sx={{ mr: 2, borderColor: "rgb(194,100,1)" }}
                  className="moreverticon"
                />
              ) : (
                ""
              )}
              {/* button add  */}
              <GroupAddIcon onClick={handleOpenAddDialog} />
            </div>
          ) : (
            ""
          )}

          {/* adding dialog  */}
          <Dialog open={isOpenAddDialog} onClose={handleCloseAddDialog}>
            <DialogTitle sx={{ pb: 0 }}>Add {role}</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ minWidth: "500px" }}>
                {error ||
                  "Please enter member's email which is added to this field!"}
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
          {/* deleting dialog  */}
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
        </Box>

        {isDel == true ? (
          <div
            className="selectAll"
            style={{
              paddingTop: "10px",
              paddingLeft: "16px",
              paddingBottom: "0",
              marginBottom: "-10px",
            }}
          >
            <input
              style={{ width: "20px", height: "20px", display: "inline-block" }}
              type="checkbox"
              onChange={handleSelectAll}
              checked={isCheck.length > 0}
            />
            <Button
              style={{
                marginBottom: "10px",
                marginLeft: "15px",
                color: "rgb(194,100,1)",
                height: "25px",
              }}
              variant="text"
              onClick={handleOpenDelDialog}
            >
              Delete
            </Button>
          </div>
        ) : (
          ""
        )}

        {/* list all of members */}
        <div className="members">
          {members
            ? members.map((elm) => {
                return (
                  <Item
                    key={elm.userId._id}
                    nameMember={elm.userId.name}
                    id={elm.userId._id}
                    isCheck={isCheck}
                    setIsCheck={setIsCheck}
                    isDel={isDel}
                    photo={elm.userId.photo}
                  />
                );
              })
            : ""}
        </div>
      </Box>
    </Box>
  );
}
