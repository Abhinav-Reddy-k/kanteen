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
    foodAdded: (home, action) => {
      home.food = action.payload;
      home.lastFetch = Date.now();
    }
  }
});

const { foodAdded } = slice.actions;

export default slice.reducer;

export const loadFood = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.home;
  const diffInMin = moment().diff(moment(lastFetch), "minutes");
  if (diffInMin < 1) return;
  dispatch(
    apiCallBegan({
      url: "/foodItems",
      onSuccess: foodAdded.type,
      method: "get"
    })
  );
};
