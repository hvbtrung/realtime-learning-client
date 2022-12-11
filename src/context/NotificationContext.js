import { createContext, useState } from "react";
export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [typeNotification, setTypeNotification] = useState(null);
  const [messageNotification, setMessageNotification] = useState("");
  const [isAppearNotification, setIsAppearNotification] = useState(false);

  return (
    <NotificationContext.Provider
      value={{
        typeNotification,
        setTypeNotification,
        messageNotification,
        setMessageNotification,
        isAppearNotification,
        setIsAppearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
