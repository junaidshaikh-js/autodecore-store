import produce from "immer";

const filterInitialState = {
  sort: "",
  inStock: false,
  rating: 0,
  categories: [],
  price: 2000,
};

export const dataReducer = produce((state, { type, payload }) => {
  switch (type) {
    case "SET_PRODUCTS":
      state.products = payload;
      break;

    case "SET_CATEGORIES":
      state.categories = payload;
      break;

    case "SET_CART":
      state.productsInCart = payload;
      break;

    case "CLEAR_FILTERS":
      state.filters = filterInitialState;
      break;

    case "INCLUDE_OUT_OF_STOCK":
      state.filters.inStock = payload;
      break;

    case "FILTER_BY_CATEGORY":
      if (payload.isChecked) {
        state.filters.categories.push(payload.value);
      } else {
        state.filters.categories = state.filters.categories.filter(
          (category) => category !== payload.value
        );
      }
      break;

    case "FILTER_BY_PRICE_RANGE":
      state.filters.price = payload;
      break;

    case "SORT_BY_RATING":
      state.filters.rating = payload;
      break;

    case "SORT_BY_PRICE":
      state.filters.sort = payload;
      break;

    case "ADD_TO_WISHLIST":
    case "REMOVE_ITEM_FROM_WISHLIST":
    case "SET_WISHLIST":
      state.productsInWishList = payload;
      break;

    case "REMOVE_ITEM_FROM_CART":
    case "UPDATE_CART_QUANTITY":
    case "EMPTY_CART":
      state.productsInCart = payload;
      break;

    case "LOG_OUT":
      state.productsInCart = [];
      state.productsInWishList = [];
      break;

    case "SET_ORDERS":
      state.orders.push(payload);
      break;

    default:
      throw new Error("Unhandled action type");
  }
});
