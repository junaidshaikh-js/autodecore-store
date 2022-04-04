const filterInitialState = {
  sort: "",
  inStock: false,
  rating: 0,
  categories: [],
  price: 2000,
};

export function dataReducer(state, { type, payload }) {
  switch (type) {
    case "SET_PRODUCTS":
      return { ...state, products: payload };
    case "SET_CATEGORIES":
      return { ...state, categories: payload };
    case "SET_CART":
      return { ...state, productsInCart: payload };
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
    case "SORT_BY_PRICE":
      return {
        ...state,
        filters: { ...state.filters, sort: payload },
      };
    case "ADD_TO_WISHLIST":
    case "REMOVE_ITEM_FROM_WISHLIST":
    case "SET_WISHLIST":
      return {
        ...state,
        productsInWishList: payload,
      };
    case "REMOVE_ITEM_FROM_CART":
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        productsInCart: payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        productsInCart: [],
        productsInWishList: [],
      };
    default:
      throw new Error("Unhandled action type");
  }
}
