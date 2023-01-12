import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CustomizedSnackbars from "../notification/snackbars";
import DeleteGroupCardDialog from "./DeleteGroupDialog";
import ShareGroupDialog from "./ShareGroupDialog";
import "./GroupCard.scss";

const handleRoleInGroup = (strRole) => {
  switch (strRole) {
    case "ROLE_OWNER":
      return "own";
    case "ROLE_COOWNER":
      return "coown";
    default:
      return "mem";
  }
};

export default function GroupCard({ name, id, shortDesc, role, link }) {
  const [isOpenShareDialog, setIsOpenShareDialog] = React.useState(false);
  const [isOpenDelDialog, setIsOpenDelDialog] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [noti, setNoti] = React.useState(false);
  const [message, setMessage] = React.useState("");
  link = `${process.env.REACT_APP_DOMAIN}/group/join?${link}`;

  role = handleRoleInGroup(role);
  const concreteURL = `/group/detail-information/${id}?${role}`;

  const handleOpenShareDialog = () => {
    setIsOpenShareDialog(true);
  };
  const handleCloseShareDialog = () => {
    setIsOpenShareDialog(false);
  };
  const handleOpenDelDialog = () => {
    setIsOpenDelDialog(true);
  };
  const handleCloseDelDialog = () => {
    setIsOpenDelDialog(false);
  };

  return (
    <Card sx={{ maxWidth: 315, minHeight: "250px" }}>
      {status === "success" && (
        <CustomizedSnackbars type="success" status={noti} message={message} />
      )}
      {status === "error" && (
        <CustomizedSnackbars type="error" status={noti} message={message} />
      )}
      <CardMedia
        component="img"
        alt="Group Card Image"
        height="140"
        image="https://gstatic.com/classroom/themes/img_read.jpg"
        sx={{ position: "relative" }}
      />
      <CardContent className="groupCard__content">
        <Typography gutterBottom className="groupCard__content--nameGroup">
          {name}
        </Typography>
        <Typography className="groupCard__content--shortDescription">
          {shortDesc}
        </Typography>
      </CardContent>
      <CardActions className="groupCard__action">
        <Button size="small" onClick={handleOpenShareDialog}>
          Share
        </Button>
        <Link to={concreteURL} style={{ textDecoration: "none" }}>
          <Button size="small">MORE INFO</Button>
        </Link>

        {role === "own" && (
          <Button size="small" onClick={handleOpenDelDialog}>
            Delete
          </Button>
        )}
      </CardActions>

      <div>
        <DeleteGroupCardDialog
          openDelDialog={isOpenDelDialog}
          closeDelDialogFunc={handleCloseDelDialog}
          nameGroup={name}
          idGroup={id}
          setStatus={setStatus}
          setNoti={setNoti}
          setMessage={setMessage}
          noti={noti}
        />
        <ShareGroupDialog
          isOpenShareDialog={isOpenShareDialog}
          handleCloseShareDialog={handleCloseShareDialog}
          link={link}
          setStatus={setStatus}
          setNoti={setNoti}
          setMessage={setMessage}
          noti={noti}
        />
      </div>
    </Card>
  );
}
