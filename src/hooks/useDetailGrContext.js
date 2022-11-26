import { useContext } from "react";
import { DetailGrContext } from "../context/DetailGroupContext";

export const useDetailGrContext = () => {
  const context = useContext(DetailGrContext);

  return context;
};
