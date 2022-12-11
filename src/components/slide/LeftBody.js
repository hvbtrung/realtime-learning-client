import React from "react";
import { Tooltip, IconButton, Box, Typography, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ItemLeftBody = () => {
  return (
    <Box
      className="LeftBodySlide-Item"
      sx={{
        m: "5%",
        p: 2,
        width: "90%",
        height: "120px",
        backgroundColor: "#cfcfcf",
        borderColor: "#ccc",
        border: "5px",
        borderRadius: "2px",
        color: "white",
      }}
    >
      abc
    </Box>
  );
};

export function LeftBodySlide() {
  return (
    <div>
      <Box className="LeftBodySlide">
        <ItemLeftBody />
        <ItemLeftBody />
        <ItemLeftBody />
        <ItemLeftBody />
      </Box>
    </div>
  );
}
