import React from "react";
import { Tooltip, IconButton, Box, Typography, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function RightBodySlide() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box className="RightBodySlide" sx={{}}>
      <Box className="RightBodySlide-header">
        <Typography>Slide type</Typography>
        <Box sx={{ mt: 4, maxWidth: "100%" }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="SlideType-Choice"
              value={age}
              lable="option"
              onChange={handleChange}
              sx={{ maxWidth: "100%" }}
            >
              <MenuItem value={10}>Whatever</MenuItem>
              <MenuItem value={20}>You write any thing you like</MenuItem>
              <MenuItem value={30}>So tired</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
