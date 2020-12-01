import moment from "moment";
import { apiCallBegan } from "../api";
import { getCurrentUser } from "../../services/authService";
import { toast } from "react-toastify";
const { createSlice } = require("@reduxjs/toolkit");
let cartBool;

const slice = createSlice({
  name: "home",
  initialState: {
    food: [],
    cart: [],
    user: getCurrentUser(),
    lastFetch: null,
    category: "All"
  },
  reducers: {
    foodReceived: (home, action) => {
      home.food = action.payload;
      home.lastFetch = Date.now();
    },
    cartLoaded: (home, action) => {
      home.cart = action.payload.cart;
      // home.user = action.payload;
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
    itemAddedRemovedToCart: (home, action) => {
      home.cart = action.payload;
      cartBool ? toast.success("Added to cart") : toast.error("Removed from cart")
    },
    quantityUpdated: (home,action) => {
      const ind = home.cart.findIndex(
        obj => obj.item === action.payload.cartFoodId
      );
      console.log(ind);
      home.cart[ind].quantity = action.payload.quantity
    },
    cartEmptied : (home,action) => {
      home.cart = action.payload;
    }
  }
});

const {
  foodReceived,
  itemAdded,
  itemUpdated,
  itemDeleted,
  foodCategorized,
  itemAddedRemovedToCart,
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
      method: "get"
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
      onSuccess: cartLoaded.type
    })
  );
};

export const addItem = (item) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/foodItems`,
      method: "post",
      data: item,
      onSuccess: itemAdded.type
    })
  );
};

export const updateItem = (item, id) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/foodItems/${id}`,
      method: "put",
      data: item,
      onSuccess: itemUpdated.type
    })
  );
};

export const deleteItem = (id) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/foodItems/${id}`,
      method: "delete",
      onSuccess: itemDeleted.type
    })
  );
};

export const addRemoveCart = (cartFoodId, bool) => (dispatch, getState) => {
  const userId = getState().entities.home.user._id;
  cartBool = bool;
  dispatch(
    apiCallBegan({
      method: "post",
      url: `/users/${bool ? "cart" : "removecart"}`,
      data: { cartFoodId, userId },
      onSuccess: itemAddedRemovedToCart.type
    })
  );
};

export const setQuantity = (cartFoodId, quantity) => (dispatch,getState) => {
  const userId = getState().entities.home.user._id;
  dispatch(
    apiCallBegan({
      method:"post",
      url:`/users/setQuantity`,
      data : {cartFoodId, userId, quantity},
      onSuccess: quantityUpdated.type
    })
  )
}

export const emptyCart = () => (dispatch,getState) => {
  const userId = getState().entities.home.user._id;
  dispatch(
    apiCallBegan({
      method:"post",
      url:`/users/emptycart`,
      data : {userId},
      onSuccess: cartEmptied.type
    })
  )
}


export const categorizeFood = (category) => (dispatch) => {
  dispatch(foodCategorized({ category }));
};
// Selectors
export const getFoodItems = (store) => store.entities.home.food;
