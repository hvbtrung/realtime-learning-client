import { useContext } from "react";
import { GroupContext } from "../context/GroupContext";

export const useGroupContext = () => {
  const context = useContext(GroupContext);
  return context;
};
