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
    }
  }
});

const { foodReceived, itemAdded } = slice.actions;

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

export const addItem = (item) => {
  apiCallBegan({
    url: "/foodItems",
    method: "post",
    data: item,
    onSuccess: itemAdded.type
  });
};
// Selectors
export const getFoodItems = (store) => store.entities.home.food;

export const getItem = (foodItems, itemId) => {
  const item = foodItems.filter((item) => item.itemId === itemId);
  return item;
};
