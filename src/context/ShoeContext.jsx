import { createContext, useReducer } from "react";
import { initState, reducer } from "./../reducer/reducer";

export const ShoeContext = createContext();

export function ShoeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  return <ShoeContext.Provider value={{ state, dispatch }}>{children}</ShoeContext.Provider>;
}
