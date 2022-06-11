import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  favorites: [],
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state]);

  // console.log("I load the state here faster (and once!!!) my nigga")

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        favorites: state.favorites,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
