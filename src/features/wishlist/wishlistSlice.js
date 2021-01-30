import { apiCallBegan } from "../api";
import { toast } from "react-toastify";
const { createSlice, createSelector } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    itemAdded: (wishlist, action) => {
      wishlist.items = action.payload;
      toast.success("Successfully Added to Wishlist");
    },
    itemRemoved: (wishlist, action) => {
      wishlist.items = action.payload;
      toast.warn("Successfully Removed from Wishlist");
    },
    wishlistLoaded: (wishlist, action) => {
      wishlist.items = action.payload;
    },
  },
});

const { itemAdded, itemRemoved, wishlistLoaded } = slice.actions;

export default slice.reducer;

export const addItem = (itemId) => (dispatch, getState) => {
  const userId = getState().entities.home.user._id;
  dispatch(
    apiCallBegan({
      url: `/users/wishlist`,
      method: "post",
      data: { itemId, userId },
      onSuccess: itemAdded.type,
    })
  );
};

export const delete_item_from_wishlist = (itemId) => (dispatch, getState) => {
  const userId = getState().entities.home.user._id;
  dispatch(
    apiCallBegan({
      url: `/users/remove_wishlist`,
      method: "post",
      data: { itemId, userId },
      onSuccess: itemRemoved.type,
    })
  );
};

export const emptyWishlist = () => (dispatch, getState) => {
  const userId = getState().entities.home.user._id;
  dispatch(
    apiCallBegan({
      url: `/users/empty_wishlist`,
      method: "post",
      data: { userId },
      onSuccess: itemRemoved.type,
    })
  );
};

export const loadWishlist = () => (dispatch, getState) => {
  const _id = getState().entities.home.user._id;
  dispatch(
    apiCallBegan({
      url: "/users/get_user_wishlist",
      data: { _id },
      method: "post",
      onSuccess: wishlistLoaded.type,
    })
  );
};

// Selectors

export const getWishList = (store) => store.entities.wishlist.items;

export const isItemInWishlist = (itemId) =>
  createSelector(
    (store) => store.entities.wishlist.items,
    (items) => items.filter((id) => id === itemId).length !== 0
  );
