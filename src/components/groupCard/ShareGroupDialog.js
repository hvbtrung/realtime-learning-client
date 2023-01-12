import * as React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SendIcon from "@mui/icons-material/Send";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { validateEmail } from "../group/Member";
import axiosInstance from "../../utils/axiosInstance";

const handleRoleInGroup = (strRole) => {
  console.log(strRole);
  switch (strRole) {
    case "ROLE_OWNER":
      return "own";
    case "ROLE_COOWNER":
      return "coown";
    default:
      return "mem";
  }
};

export default function ShareGroupDialog({
  isOpenShareDialog,
  handleCloseShareDialog,
  link,
  setStatus,
  setNoti,
  setMessage,
  noti,
}) {
  const [email, setEmail] = React.useState("");
  const [lableEmail, setLabelEmail] = React.useState(false);

  const sendMail = async () => {
    const response = await axiosInstance.post(`/api/groups/invite`, {
      data: {
        inviteeEmail: email,
        link: link,
      },
    });

    if (response.data.status === "success") {
      setStatus("success");
      setMessage(response.data.message);
      setEmail("");
    } else {
      setStatus("error");
      setMessage(response.data.message);
    }

    setNoti(!noti);
  };
  const handleSubmitSendEmail = () => {
    if (!validateEmail(email)) {
      return setLabelEmail("Invalid email");
    }
    sendMail();
  };
  return (
    <Dialog
      open={isOpenShareDialog}
      onClose={handleCloseShareDialog}
      aria-labelledby="Send Email Dialog & Share"
      aria-describedby="Send Email Dialog & Share"
    >
      <DialogTitle id="Send Email - Share Group">
        Group Invitation Link
      </DialogTitle>

      <DialogContent sx={{ mb: 3 }}>
        <div>
          <TextField
            id="outlined-error"
            sx={{ width: "400px" }}
            value={link}
            inputProps={{ readOnly: true }}
          />
          <CopyToClipboard text={link}>
            <Tooltip title="Copy link" sx={{ mt: 1, ml: 2 }}>
              <IconButton>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </CopyToClipboard>
        </div>

        <div style={{ marginTop: "50px" }}>
          <TextField
            id="outlined-password-input"
            label={lableEmail || "Invitee's email"}
            type="text"
            autoComplete="current-password"
            sx={{ width: "400px" }}
            value={email}
            error={lableEmail ? true : false}
            onChange={(e) => {
              setEmail(e.target.value);
              setLabelEmail(false);
            }}
          />
          <Tooltip title="Send" sx={{ mt: 1, ml: 2 }}>
            <IconButton onClick={handleSubmitSendEmail}>
              <SendIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </DialogContent>
    </Dialog>
  );
}
