import { createContext, useContext, useReducer } from "react";

import { dataReducer } from "./reducers/data-reducer";

const DataContext = createContext({});

const initialState = {
  products: [],
  orders: [],
  categories: [],
  productsInCart: [],
  productsInWishList: [],
  filters: {
    sort: "",
    inStock: false,
    rating: 0,
    categories: [],
    price: 10000,
  },
};

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const value = { state, dispatch };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);
