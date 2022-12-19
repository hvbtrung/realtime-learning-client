import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import axiosInstance from "../utils/axiosInstance";
export const GroupContext = createContext({});

export const GroupContextProvider = ({ children }) => {
  const { isReload } = useAuthContext();
  const [groups, setGroups] = useState([]);
  const [update, setUpdate] = useState(false);

  const getGroupsByUserId = async () => {
    // const res = await axios.get(`${url}/api/groups`, {
    //   withCredentials: true,
    //   validateStatus: () => true,
    // });

    const res = await axiosInstance.get(`/api/groups`);

    setGroups(res.data.groups);
  };

  useEffect(() => {
    getGroupsByUserId();
    // eslint-disable-next-line
  }, [isReload]);

  return (
    <GroupContext.Provider value={{ groups, setGroups, update, setUpdate }}>
      {children}
    </GroupContext.Provider>
  );
};
