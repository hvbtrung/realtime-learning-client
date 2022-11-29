import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import axios from "axios";
export const GroupContext = createContext({});

export const GroupContextProvider = ({ children }) => {
  const { isReload } = useAuthContext();
  const [groups, setGroups] = useState([]);
  const [update, setUpdate] = useState(false);
  const url = process.env.REACT_APP_API_URL;

  const getGroupsByUserId = async () => {
    const res = await axios.get(`${url}/api/groups`, {
      withCredentials: true,
      validateStatus: () => true,
    });

    setGroups(res.data.groups);
  };

  useEffect(() => {
    getGroupsByUserId();
  }, [isReload]);

  return (
    <GroupContext.Provider value={{ groups, setGroups, update, setUpdate }}>
      {children}
    </GroupContext.Provider>
  );
};
