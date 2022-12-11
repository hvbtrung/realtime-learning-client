import React from "react";
import { Tooltip, IconButton, Box, Typography, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LeftBodySlide } from "./LeftBody";
import { RightBodySlide } from "./RightBody";
import { CenterBodySlide } from "./CenterBody";

export function BodySlide() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          maxHeight: "80vh",
        }}
      >
        <Box
          className="slides__body--left"
          sx={{
            flexGrow: 1.5,
            backgroundColor: "#fff",
            flexShrink: 0,
            maxWidth: "100%",
            minWidth: "15%",
            overflowY: "scroll",
          }}
        >
          <LeftBodySlide />
        </Box>
        <Box
          className="slides__body--center"
          sx={{
            flexGrow: 5.4,
            backgroundColor: "#cfcfcf",
            flexShrink: 0,
            maxWidth: "55%",
            minWidth: "55%",
          }}
        >
          <CenterBodySlide />
        </Box>
        <Box
          className="slides__body--right"
          sx={{
            flexGrow: 3.1,
            backgroundColor: "#fff",
            flexShrink: 0,
            maxWidth: "100%",

            overflowY: "scroll",
            p: "15px",
          }}
        >
          <RightBodySlide />
        </Box>
      </Box>
    </div>
  );
}
