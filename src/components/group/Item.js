import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function Item(props) {
  return (
    <Box>
      <Box
        className="Info-item"
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          justifyContent: "flex-start",
          pl: 2,
          mt: 2,
          borderBottom: 0.001,
          borderColor: "#cfcfcf",
        }}
      >
        <div className="Info-item--img">
          <Tooltip>
            <IconButton>
              <Avatar sx={{ width: 32, height: 32 }}>V</Avatar>
            </IconButton>
          </Tooltip>
        </div>
        <div>{props.nameMember}</div>
      </Box>
    </Box>
  );
}
