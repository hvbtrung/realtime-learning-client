// import axios from "axios";
// import { useState } from "react";
import { useContext } from "react";
import GroupCard from "../components/groupCard/GroupCard";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { GroupContext } from "../context/GroupContext";

const Home = () => {
  const { groups } = useContext(GroupContext);

  return (
    <React.Fragment>
      {groups.length === 0 ? (
        <h3>You don't join any group</h3>
      ) : (
        <Grid container spacing={2} columns={{ xs: 8, sm: 4, md: 12 }}>
          {groups.map((elm) => {
            return (
              <Grid item xs={3} key={elm.groupId._id}>
                <GroupCard
                  id={elm.groupId._id}
                  name={elm.groupId.name}
                  owner={elm.userId.name}
                  shortDesc={elm.groupId.shortDesc}
                  role={elm.role}
                  link={elm.groupId._id}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Home;
