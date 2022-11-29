import { createContext, useState } from "react";

export const DetailGrContext = createContext({});

export const DetailGroupCtxProvider = ({ children }) => {
  const [isReloadMember, setIsReloadMember] = useState(false);

  return (
    <DetailGrContext.Provider value={{ isReloadMember, setIsReloadMember }}>
      {children}
    </DetailGrContext.Provider>
  );
};
