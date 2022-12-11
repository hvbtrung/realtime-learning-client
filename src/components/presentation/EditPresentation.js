import * as React from "react";
import { useState } from "react";
import { Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import RenameDialog from "./RenamePresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";

export function EditButton({ namePresentation, idPresentation }) {
  const [isOpenOptionDialog, setIsOpenOptionDialog] = useState(null);
  const [isOpenRenameDialog, setIsOpenRenameDialog] = useState(null);

  const openRenamDialog = Boolean(isOpenRenameDialog);
  const open = Boolean(isOpenOptionDialog);

  const openOptionDialog = (event) => {
    setIsOpenOptionDialog(event.currentTarget);
  };
  const closeOptionDialog = () => {
    setIsOpenOptionDialog(null);
  };

  const closeRenameDialog = () => {
    setIsOpenRenameDialog(null);
  };
  const openRenameDialog = () => {
    setIsOpenRenameDialog(true);
    closeOptionDialog();
  };

  return (
    <div>
      <RenameDialog
        openRenamDialog={openRenamDialog}
        closeRenameDialog={closeRenameDialog}
        prevNamePresentation={namePresentation}
        idPresentation={idPresentation}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={isOpenOptionDialog}
        open={open}
        onClose={closeOptionDialog}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={openRenameDialog}>
          <EditIcon sx={{ mr: "10px" }} />
          Rename
        </MenuItem>
        <MenuItem onClick={closeOptionDialog}>
          <GroupsIcon sx={{ mr: "10px" }} /> Invite collaborators
        </MenuItem>
        <MenuItem onClick={closeOptionDialog}>
          <ShareIcon sx={{ mr: "10px" }} /> Share
        </MenuItem>
        <MenuItem onClick={closeOptionDialog}>
          <DeleteIcon sx={{ mr: "10px" }} /> Delete
        </MenuItem>
      </Menu>
      <Tooltip title="Edit" sx={{ mt: 1, ml: 2 }} onClick={openOptionDialog}>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
