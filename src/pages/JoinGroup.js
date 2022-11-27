import { useAuthContext } from "../hooks/useAuthContext";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import CustomizedSnackbars from "../components/notification/snackbars";

export const JoinGroup = () => {
  const { user } = useAuthContext();

  const [group, setGroup] = useState({});
  const [status, setStatus] = useState(false);
  const [noti, setNoti] = useState(false);
  const [message, setMessage] = useState("");

  const url = process.env.REACT_APP_API_URL;

  let groupId = window.location.search.slice(1);

  const joinGroup = async () => {
    try {
      const response = await axios.post(`${url}/api/group/join`, {
        withCredentials: true,
        validateStatus: () => true,
        data: {
          userId: user._id,
          groupId: groupId,
          role: "ROLE_MEMBER",
        },
      });

      if (response.data.status === "error") {
        setStatus("error");
        setMessage(response.data.message);
        setNoti(!noti);
      }
      console.log(response.data);
    } catch (e) {
      console.error("error get group", e);
    }
  };
  const getGroup = async () => {
    try {
      const response = await axios.get(`${url}/api/group/${groupId}`, {
        withCredentials: true,
        validateStatus: () => true,
      });

      if (response.data.status === "success") {
        setGroup(response.data.group.groupId);
      } else {
        setStatus("notfound");
        setMessage("Group doesn't exist");
        setNoti(!noti);
      }
    } catch (e) {
      console.error("error get group", e);
    }
  };

  React.useEffect(() => {
    getGroup();
    // eslint-disable-next-line
  }, []);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      style={{ minHeight: "100vh" }}
    >
      {status === "error" && (
        <CustomizedSnackbars type="error" status={noti} message={message} />
      )}
      {status === "notfound" && (
        <CustomizedSnackbars type="error" status={noti} message={message} />
      )}

      {status === "notfound" || (
        <Grid item xs={3}>
          <Box
            sx={{
              width: 700,
              height: 450,
              mt: 6,
              p: 0,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "rgba(0,0,0,.87)" }}>
                Do you want to join this group ?
              </h3>
            </div>
            <Card
              sx={{
                maxWidth: 315,
                ml: "50%",
              }}
              style={{
                transform: `translate(-50%)`,
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://gstatic.com/classroom/themes/img_read.jpg"
                sx={{ position: "relative" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    color: "white",
                    position: "absolute",
                    transform: "translateY(-400%)",
                  }}
                >
                  {group.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="left"
                  sx={{
                    color: "black",
                  }}
                >
                  {group.shortDesc}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  sx={{ ml: 1 }}
                  variant="outlined"
                  size="medium"
                  onClick={joinGroup}
                >
                  JOIN Group
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
