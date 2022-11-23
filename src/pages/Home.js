// import axios from "axios";
// import { useState } from "react";
import GroupCard from "../components/customize/GroupCard";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { GroupContextProvider } from "../context/GroupContext";
const Home = () => {
  // const [users, setUsers] = useState();

  // const handleClick = async () => {
  //   const url = process.env.REACT_APP_API_URL;
  //   const response = await axios.get(`${url}/api/users`, {
  //     withCredentials: true,
  //     validateStatus: () => true,
  //   });
  //   const json = response.data;

  //   setUsers(json.data.users);
  // };

  return (
    <GroupContextProvider>
      <React.Fragment>
        <Grid container spacing={2} columns={{ xs: 8, sm: 4, md: 12 }}>
          <Grid item xs={3}>
            <GroupCard id="1" />
          </Grid>
          <Grid item xs={3}>
            <GroupCard id="2" />
          </Grid>
          <Grid item xs={3}>
            <GroupCard id="3" />
          </Grid>
          <Grid item xs={3}>
            <GroupCard id="4" />
          </Grid>
        </Grid>
      </React.Fragment>
    </GroupContextProvider>
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
