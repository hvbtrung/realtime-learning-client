import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const style = {
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  justifyContent: "flex-start",
  pl: 2,
  borderBottom: 0.001,
  borderColor: "#cfcfcf",
};

export default function Item({
  nameMember,
  isCheck,
  setIsCheck,
  id,
  isDel,
  photo,
}) {
  const handleClick = (e) => {
    let { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      // checkbox is not checked
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  return (
    <Box className="Info-item" sx={style}>
      {isDel && (
        <div style={{ paddingTop: "10px" }}>
          <input
            style={{ width: "20px", height: "20px" }}
            type="checkbox"
            id={id}
            key={id}
            checked={isCheck.includes(id)}
            onChange={(e) => {
              handleClick(e);
            }}
          />
        </div>
      )}

      <div className="Info-item--img">
        <Tooltip>
          <IconButton>
            <Avatar sx={{ width: 32, height: 32 }} src={photo}></Avatar>
          </IconButton>
        </Tooltip>
      </div>
      <div>{nameMember}</div>
    </Box>
  );
}
