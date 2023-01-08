import { createContext, useState } from "react";
export const PresentationContext = createContext({});

export const PresentationProvider = ({ children }) => {
  const [typePresentation, setTypePresentation] = useState("ownedbyme");

  return (
    <PresentationContext.Provider
      value={{
        typePresentation,
        setTypePresentation,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
