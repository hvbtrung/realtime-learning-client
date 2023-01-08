import { useContext } from "react";
import { PresentationContext } from "../context/PresentationContext";

export const usePresentationContext = () => {
  const context = useContext(PresentationContext);
  return context;
};
