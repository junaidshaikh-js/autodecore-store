const filterInitialState = {
  sort: "",
  inStock: false,
  rating: 0,
  categories: [],
  price: 2000,
};

export function stateReducer(state, { type, payload }) {
  switch (type) {
    case "SET_PRODUCTS":
      return { ...state, products: payload };
    case "SET_CATEGORIES":
      return { ...state, categories: payload };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...filterInitialState,
        },
      };
    case "INCLUDE_OUT_OF_STOCK":
      return { ...state, filters: { ...state.filters, inStock: payload } };
    case "FILTER_BY_CATEGORY":
      return {
        ...state,
        filters: {
          ...state.filters,
          categories: payload.isChecked
            ? [...state.filters.categories, payload.value]
            : state.filters.categories.filter(
                (category) => category !== payload.value
              ),
        },
      };
    case "FILTER_BY_PRICE_RANGE":
      return {
        ...state,
        filters: {
          ...state.filters,
          price: payload,
        },
      };
    case "SORT_BY_RATING":
      return {
        ...state,
        filters: { ...state.filters, rating: payload },
      };
    default:
      throw new Error("Unhandled action type");
  }
}
