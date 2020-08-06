import { combineReducers } from "redux";
import homeReducer from "../../features/homePage/homeSlice";

export default combineReducers({
  home: homeReducer,
});
