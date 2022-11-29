import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
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
import CustomizedSnackbars from "../notification/snackbars";
import axios from "axios";

export default function GroupCard({ name, id, shortDesc, role, link }) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [lableEmail, setLabelEmail] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [noti, setNoti] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (role === "ROLE_OWNER") {
    role = "own";
  } else if (role === "ROLE_MEMBER") {
    role = "mem";
  } else {
    role = "coown";
  }

  const sendMail = async () => {
    const url = process.env.REACT_APP_API_URL;

    const response = await axios.post(
      `${url}/api/group/invite`,
      {
        data: {
          inviteeEmail: email,
          link: link,
        },
      },
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );

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

  link = `${process.env.REACT_APP_DOMAIN}/group/join?${link}`;
  const concreteURL = `/group/detail-information/${id}?${role}`;
  return (
    <Card sx={{ maxWidth: 315 }}>
      {status === "success" && (
        <CustomizedSnackbars type="success" status={noti} message={message} />
      )}
      {status === "error" && (
        <CustomizedSnackbars type="error" status={noti} message={message} />
      )}
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://gstatic.com/classroom/themes/img_read.jpg"
        sx={{ position: "relative" }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            color: "white",
            position: "absolute",
            transform: "translateY(-400%)",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          sx={{
            color: "black",
          }}
        >
          {shortDesc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickOpen}>
          Share
        </Button>
        <Button size="small">
          <Link href={concreteURL} underline="none">
            MORE INFO
          </Link>
        </Button>
      </CardActions>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Group Invitation Link"}
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
      </div>
    </Card>
  );
}
