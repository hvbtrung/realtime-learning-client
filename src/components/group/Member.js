import * as React from "react";
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

export default function Member(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box m="auto" sx={{ maxWidth: "600px", mb: 5, mt: 2 }}>
      <Box>
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
          <Typography variant="h5">{props.header}</Typography>
          <GroupAddIcon onClick={handleClickOpen} />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add {props.header}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter member's email which is added to this field.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button sx={{ color: "#bb3e03" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleClose}>Add</Button>
            </DialogActions>
          </Dialog>
        </Box>

        {props.members
          ? props.members.map((elm, index) => {
              return <Item key={index} nameMember={elm.name} />;
            })
          : ""}
      </Box>
    </Box>
  );
}
