import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
export const GroupContext = createContext();

export const GroupContextProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const url = process.env.REACT_APP_API_URL;

  //   useEffect(() => {
  //     axios.get(`${url}/groups`);
  //   }, []);

  return (
    <GroupContext.Provider value={{ groups }}>{children}</GroupContext.Provider>
  );
};
