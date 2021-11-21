import { createContext, useEffect, useReducer } from "react";
import SearchReducer from "./SearchReducer";

const INITIAL_STATE = {
  search:""
};


export const SearchContext = createContext(INITIAL_STATE);
export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE); 
  return (
    <SearchContext.Provider
      value={{
        search: state.search,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};