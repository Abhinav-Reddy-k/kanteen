import moment from "moment";
import { apiCallBegan } from "../api";
const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: "home",
  initialState: {
    food: [],
    lastFetch: null
  },
  reducers: {
    foodReceived: (home, action) => {
      home.food = action.payload;
      home.lastFetch = Date.now();
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
    }
  }
});

const { foodReceived, itemAdded, itemUpdated, itemDeleted } = slice.actions;

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
// Selectors
export const getFoodItems = (store) => store.entities.home.food;
