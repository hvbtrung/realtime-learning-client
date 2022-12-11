import React from "react";
import { Tooltip, IconButton, Box, Typography, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function HeaderSlide() {
  return (
    <div>
      <Box
        className="HeaderSlide"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box className="HeaderSlide__Left">
          <Tooltip title="Back" sx={{ mr: 0 }}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Button sx={{ ml: 1 }} variant="outlined">
            + New Slide
          </Button>
        </Box>
        <Box className="HeaderSlide__Center">
          <Typography>My first presentation</Typography>
        </Box>
        <Box className="HeaderSlide__Right">
          <Button sx={{ ml: 3 }} variant="outlined">
            <PlayArrowIcon /> Present
          </Button>
        </Box>
      </Box>
    </div>
  );
}
