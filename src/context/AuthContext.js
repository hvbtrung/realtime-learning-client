import { createContext, useReducer, useEffect, useState } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null
}

export const AuthContext = createContext(INITIAL_STATE);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  // console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, isReload, setIsReload }}>
      {children}
    </AuthContext.Provider>
  );
};
