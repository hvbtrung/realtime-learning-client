import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function GroupCard({ owner, name, id, shortDesc, role }) {
  if (role === "ROLE_OWNER") {
    role = "own";
  } else if (role === "ROLE_MEMBER") {
    role = "mem";
  } else {
    role = "coown";
  }

  const concreteURL = `/group/detail-information/${id}?${role}`;

  return (
    <Card sx={{ maxWidth: 315 }}>
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
          {name}
        </Typography>
        <Typography
          gutterBottom
          variant="span"
          component="div"
          sx={{
            color: "white",
            position: "absolute",
            transform: "translateY(-350%)",
          }}
        >
          {owner}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          sx={{
            color: "black",
          }}
        >
          {shortDesc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">
          {" "}
          <Link href={concreteURL} underline="none">
            MORE INFO
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
