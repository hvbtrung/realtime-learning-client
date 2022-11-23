import { useContext } from "react";
import { GroupContext } from "../context/GroupContext";

export const useGroupContext = () => {
  const groupContext = useContext(groupContext);
  return groupContext;
};
