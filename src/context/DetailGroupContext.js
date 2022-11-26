import { createContext, useState } from "react";

export const DetailGrContext = createContext({});

export const DetailGroupCtxProvider = ({ children }) => {
  const [callApi, setCallApi] = useState(false);

  return (
    <DetailGrContext.Provider value={{ callApi, setCallApi }}>
      {children}
    </DetailGrContext.Provider>
  );
};
