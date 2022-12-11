import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  return context;
};
