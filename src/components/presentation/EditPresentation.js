import * as React from "react";
import { useState } from "react";
import { Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import RenameDialog from "./RenamePresentation";
import DeleteDialog from "./DeletePresentation";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";

export function EditButton({ namePresentation, idPresentation }) {
  const [isOpenOptionDialog, setIsOpenOptionDialog] = useState(null);
  const [isOpenRenameDialog, setIsOpenRenameDialog] = useState(null);
  const [isOpenDelDialog, setIsOpenDelDialog] = useState(false);

  const openRenamDialogBool = Boolean(isOpenRenameDialog);
  const openMenuBool = Boolean(isOpenOptionDialog);
  const openDelDialogBool = Boolean(isOpenDelDialog);

  const openOptionDialog = (event) => {
    setIsOpenOptionDialog(event.currentTarget);
  };
  const closeOptionDialog = () => {
    setIsOpenOptionDialog(null);
  };

  const closeRenameDialogFunc = () => {
    setIsOpenRenameDialog(null);
  };
  const openRenameDialogFunc = () => {
    setIsOpenRenameDialog(true);
    closeOptionDialog();
  };

  const openDelDialogFunc = () => {
    setIsOpenDelDialog(true);
    closeOptionDialog();
  };

  const closeDelDialogFunc = () => {
    setIsOpenDelDialog(null);
  };

  return (
    <div>
      <RenameDialog
        openRenamDialog={openRenamDialogBool}
        closeRenameDialogFunc={closeRenameDialogFunc}
        prevNamePresentation={namePresentation}
        idPresentation={idPresentation}
      />
      <DeleteDialog
        openDelDialog={openDelDialogBool}
        closeDelDialogFunc={closeDelDialogFunc}
        namePresentation={namePresentation}
        idPresentation={idPresentation}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={isOpenOptionDialog}
        open={openMenuBool}
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
        <MenuItem onClick={openRenameDialogFunc}>
          <EditIcon sx={{ mr: "10px" }} />
          Rename
        </MenuItem>
        <MenuItem onClick={closeOptionDialog}>
          <GroupsIcon sx={{ mr: "10px" }} /> Invite collaborators
        </MenuItem>
        <MenuItem onClick={closeOptionDialog}>
          <ShareIcon sx={{ mr: "10px" }} /> Share
        </MenuItem>
        <MenuItem onClick={openDelDialogFunc}>
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
