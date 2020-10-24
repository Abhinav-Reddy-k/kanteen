import moment from "moment";
import { apiCallBegan } from "../api";
import { getCurrentUser, getUserCart } from "../../services/authService";
const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: "home",
  initialState: {
    food: [],
    cart: [],
    user: getCurrentUser(),
    lastFetch: null,
    category: "All",
  },
  reducers: {
    foodReceived: (home, action) => {
      home.food = action.payload;
      home.lastFetch = Date.now();
    },
    cartLoaded: (home, action) => {
      home.cart = action.payload.cart;
    },
    itemAdded: (home, action) => {
      home.food.push(action.payload);
    },
    itemUpdated: (home, action) => {
      const ind = home.food.findIndex(
        (item) => item._id === action.payload._id
      );
      home.food.splice(ind, 1, action.payload);
    },
    itemDeleted: (home, action) => {
      const ind = home.food.findIndex(
        (item) => item._id === action.payload._id
      );
      home.food.splice(ind, 1);
    },
    foodCategorized: (home, action) => {
      home.category = action.payload.category;
    },
    itemAddedToCart: (home, action) => {
      home.cart = action.payload;
    },
  },
});

const {
  foodReceived,
  itemAdded,
  itemUpdated,
  itemDeleted,
  foodCategorized,
  itemAddedToCart,
  cartLoaded,
} = slice.actions;

export default slice.reducer;

export const loadFood = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.home;
  const diffInMin = moment().diff(moment(lastFetch), "minutes");
  if (diffInMin < 1) return;
  dispatch(
    apiCallBegan({
      url: "/foodItems",
      onSuccess: foodReceived.type,
      method: "get",
    })
  );
};

export const loadCart = () => (dispatch, getState) => {
  const _id = getState().entities.home.user._id;
  dispatch(
    apiCallBegan({
      url: "/users/me",
      data: { _id },
      method: "post",
      onSuccess: cartLoaded.type,
    })
  );
};

export const addItem = (item) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/foodItems`,
      method: "post",
      data: item,
      onSuccess: itemAdded.type,
    })
  );
};

export const updateItem = (item, id) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/foodItems/${id}`,
      method: "put",
      data: item,
      onSuccess: itemUpdated.type,
    })
  );
};

export const deleteItem = (id) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/foodItems/${id}`,
      method: "delete",
      onSuccess: itemDeleted.type,
    })
  );
};

export const addToCart = (cartFoodId) => (dispatch, getState) => {
  const userId = getState().entities.home.user._id;
  dispatch(
    apiCallBegan({
      method: "post",
      url: `/users/cart`,
      data: { cartFoodId, userId },
      onSuccess: itemAddedToCart.type,
    })
  );
};

export const categorizeFood = (category) => (dispatch) => {
  dispatch(foodCategorized({ category }));
};
// Selectors
export const getFoodItems = (store) => store.entities.home.food;
