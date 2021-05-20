import moment from "moment";
import { apiCallBegan } from "../api";
import { getCurrentUser } from "../../services/authService";
import { toast } from "react-toastify";
const { createSlice, createSelector } = require("@reduxjs/toolkit");

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
      home.cart = action.payload;
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
      toast.success("Item deleted successfully");
    },
    foodCategorized: (home, action) => {
      home.category = action.payload.category;
    },
    itemAddedToCart: (home, action) => {
      home.cart = action.payload;
      toast.success("Added to cart");
    },
    itemRemovedFromCart: (home, action) => {
      home.cart = action.payload;
      toast.error("Removed from cart");
    },
    quantityUpdated: (home, action) => {
      const ind = home.cart.findIndex(
        (obj) => obj.item === action.payload.cartFoodId
      );
      console.log(ind);
      home.cart[ind].quantity = action.payload.quantity;
    },
    cartEmptied: (home, action) => {
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
  itemRemovedFromCart,
  cartLoaded,
  quantityUpdated,
  cartEmptied,
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
      url: "/users/get_user_cart",
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
  dispatch(
    apiCallBegan({
      url: `/users/removeDeletedItem`,
      method: "post",
      data: { cartFoodId: id },
    })
  );
};

export const addCart = (cartFoodId) => (dispatch, getState) => {
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

export const removeCart = (cartFoodId) => (dispatch, getState) => {
  const userId = getState().entities.home.user._id;
  dispatch(
    apiCallBegan({
      method: "post",
      url: `/users/removecart`,
      data: { cartFoodId, userId },
      onSuccess: itemRemovedFromCart.type,
    })
  );
};

export const setQuantity = (cartFoodId, quantity) => (dispatch, getState) => {
  const userId = getState().entities.home.user._id;
  dispatch(
    apiCallBegan({
      method: "post",
      url: `/users/setQuantity`,
      data: { cartFoodId, userId, quantity },
      onSuccess: quantityUpdated.type,
    })
  );
};

export const emptyCart = () => (dispatch, getState) => {
  const userId = getState().entities.home.user._id;
  dispatch(
    apiCallBegan({
      method: "post",
      url: `/users/emptycart`,
      data: { userId },
      onSuccess: cartEmptied.type,
    })
  );
};

export const categorizeFood = (category) => (dispatch) => {
  dispatch(foodCategorized({ category }));
};

// Selectors
export const getFoodItems = (store) => store.entities.home.food;
export const getUser = (store) => store.entities.home.user;
export const getCart = (store) => store.entities.home.cart;
export const getCategory = (store) => store.entities.home.category;

export const isItemInCart = (itemId) =>
  createSelector(
    (store) => store.entities.home.cart,
    (cart) => cart.filter((item) => item.item === itemId).length !== 0
  );

export const noOfCartItems = createSelector(
  (store) => store.entities.home.cart,
  (cart) => cart.length
);

export const isItemAvailable = (itemId) =>
  createSelector(
    (store) => store.entities.home.food,
    (food) => food.filter((item) => item._id === itemId)[0].availability === true
  );
