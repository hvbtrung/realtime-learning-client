import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Item from "./Item";
import axiosInstance from "../../utils/axiosInstance";
import CustomizedSnackbars from "../notification/snackbars";
import { useDetailGrContext } from "../../hooks/useDetailGrContext";
import { DeleteDialog } from "./DelConfirmDialog";
import { AddDialog } from "./AddDialog";
import { OptionButton } from "./Utils";

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const styleAddRole = {
  color: "rgb(194,100,1)",
  borderBottom: 0.001,
  borderColor: "rgb(194,100,1)",
  pb: 2,
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  justifyContent: "space-between",
};

const styleDelAllButton = {
  marginBottom: "10px",
  marginLeft: "15px",
  color: "rgb(194,100,1)",
  height: "25px",
};

const styleDelCheckBoxContainer = {
  paddingTop: "10px",
  paddingLeft: "16px",
  paddingBottom: "0",
  marginBottom: "-10px",
};

export default function Member({ members, role, itsRole }) {
  const [email, setEmail] = React.useState("");
  const [isOpenAddDialog, setIsOpenAddDialog] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isCheckAll, setIsCheckAll] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState([]);
  const [isDel, setIsDel] = React.useState(false);
  const [isOpenDelDialog, setIsOpenDelDialog] = React.useState(false);
  const { isReloadMember, setIsReloadMember } = useDetailGrContext();
  const [status, setStatus] = React.useState(false);
  const [noti, setNoti] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const pathname = window.location.pathname;
  let groupId = pathname.slice(
    "/group/detail-information/".length,
    pathname.length
  );

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

  // function add member
  const assignRole = async () => {

    if (role === "Co-Owner") {
      role = "ROLE_COOWNER";
    } else {
      role = "ROLE_MEMBER";
    }

    // const url = process.env.REACT_APP_API_URL;
    // const response = await axios.post(
    //   `${url}/api/group/`,
    //   {
    //     data: {
    //       email: email,
    //       role: role,
    //       groupId: groupId,
    //     },
    //   },
    //   {
    //     withCredentials: true,
    //     validateStatus: () => true,
    //   }
    // );

    const response = await axiosInstance.post(`/api/group/`, {
      data: {
        email: email,
        role: role,
        groupId: groupId,
      },
    });

    if (response.data.status === "success") {
      setIsReloadMember(!isReloadMember);
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
  const kickOutMember = async ({ userId, groupId }) => {
    // const url = process.env.REACT_APP_API_URL;

    // await axios.delete(
    //   `${url}/api/group/${groupId}/${userId}`,

    //   {
    //     withCredentials: true,
    //     validateStatus: () => true,
    //   }
    // );

    await axiosInstance.delete(`/api/group/${groupId}/${userId}`);
  };

  // show checkbox select all for deleting members
  const showCheckboxDel = () => {
    if (members.length === 0) {
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

  const handleSubmitDeletion = async () => {
    if (isCheck.length === 0) {
      setStatus("error");
      setMessage("You don't select anyone");
      handleCloseDelDialog();
      return setNoti(!noti);
    }

    try {
      for (let userId of isCheck) {
        await kickOutMember({ userId, groupId });
      }
      handleCloseDelDialog();
      setStatus("success");
      setMessage("Delete member success");
      setNoti(!noti);
      setIsCheck([]);
      showCheckboxDel();
      setIsReloadMember(!isReloadMember);
    } catch (e) {
      setStatus("error");
      setMessage("Delete member failure");
      return console.error(e);
    }
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
        <Box sx={styleAddRole}>
          <Typography variant="h5">{role}</Typography>

          <OptionButton
            itsRole={itsRole}
            role={role}
            showCheckboxDel={showCheckboxDel}
            members={members}
            isDel={isDel}
            handleOpenAddDialog={handleOpenAddDialog}
          />
          <AddDialog
            isOpenAddDialog={isOpenAddDialog}
            handleCloseAddDialog={handleCloseAddDialog}
            handleSubmitAddition={handleSubmitAddition}
            role={role}
            setEmail={setEmail}
            setError={setError}
            error={error}
            email={email}
          />

          <DeleteDialog
            isOpenDelDialog={isOpenDelDialog}
            handleCloseDelDialog={handleCloseDelDialog}
            role={role}
            handleSubmitDeletion={handleSubmitDeletion}
          />
        </Box>

        {isDel && (
          <div className="selectAll" style={styleDelCheckBoxContainer}>
            <input
              style={{ width: "20px", height: "20px", display: "inline-block" }}
              type="checkbox"
              onChange={handleSelectAll}
              checked={isCheck.length > 0}
            />
            <Button
              style={styleDelAllButton}
              variant="text"
              onClick={handleOpenDelDialog}
            >
              Delete
            </Button>
          </div>
        )}

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
