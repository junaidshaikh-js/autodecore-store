import { createContext, useContext, useReducer } from "react";

import { stateReducer } from "./state-reducer";

const StateContext = createContext({});

const initialState = {
  products: [],
  productsInCart: [],
  productsInWishList: [],
  filters: {
    sort: "",
    inStock: false,
    rating: 0,
    categories: [],
    price: 2000,
  },
};

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const value = { state, dispatch };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
