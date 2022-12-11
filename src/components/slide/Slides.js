import React from "react";
import { Box } from "@mui/material";
import HeaderSlide from "./Header";
import { BodySlide } from "./Body";
export default function Slides() {
  return (
    <div
      className="container"
      style={{
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingBottom: "50px",
      }}
    >
      <Box className="slides">
        <Box className="slides__header">
          <HeaderSlide />
        </Box>
        <Box className="slides__body" sx={{ mt: 4 }}>
          <BodySlide />
        </Box>
      </Box>
    </div>
  );
}
