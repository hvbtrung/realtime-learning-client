// import axios from "axios";
// import { useState } from "react";
import { useContext } from "react";
import GroupCard from "../components/customize/GroupCard";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { useGroupContext } from "../hooks/useGroupContext";
import { GroupContext } from "../context/GroupContext";
const Home = () => {
  const { groups, update } = useContext(GroupContext);

  return (
    <React.Fragment>
      <Grid container spacing={2} columns={{ xs: 8, sm: 4, md: 12 }}>
        {groups.map((elm, idx) => {
          return (
            <Grid item xs={3} key={elm.groupId._id}>
              <GroupCard
                id="5"
                name={elm.groupId.name}
                owner={elm.userId.name}
                shortDesc={elm.groupId.shortDesc}
              />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Home;

/**
 * <div className="home">
            <h2>Home Page</h2>
            <button onClick={handleClick}>Get Users</button>
            {users && users.map((user, index) => (
                <div key={index}>
                    <h2>{user.email}</h2>
                    <span>{user.name}</span>
                    <h3>{user.role}</h3>
                </div>
            ))}
        </div>
 */

// const handleClick = async () => {
//   const url = process.env.REACT_APP_API_URL;
//   const response = await axios.get(`${url}/api/users`, {
//     withCredentials: true,
//     validateStatus: () => true,
//   });
//   const json = response.data;

//   setUsers(json.data.users);
// };
