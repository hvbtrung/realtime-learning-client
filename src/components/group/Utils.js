import * as React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const styleMoreIcon = {
  mr: 2,
  borderColor: "rgb(194,100,1)",
  "&:hover": {
    backgroundColor: "#cfcfcf",
    opacity: [0.9, 0.8, 0.7],
  },
};

export function OptionButton({
  itsRole,
  role,
  showCheckboxDel,
  members,
  isDel,
  handleOpenAddDialog,
}) {
  let openDelStyle = { backgroundColor: "#dddddd", borderRadius: "2px" };
  let isAppear = false;

  if (itsRole === "ROLE_OWNER" && (role === "Co-Owner" || role === "Member")) {
    isAppear = true;
  }

  return (
    <div>
      {isAppear && (
        <div>
          {members.length > 0 && (
            <MoreVertIcon
              onClick={showCheckboxDel}
              style={isDel ? openDelStyle : {}}
              sx={styleMoreIcon}
              className="moreverticon"
            />
          )}
          <GroupAddIcon
            sx={{
              "&:hover": {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
            onClick={handleOpenAddDialog}
          />
        </div>
      )}
    </div>
  );
}
