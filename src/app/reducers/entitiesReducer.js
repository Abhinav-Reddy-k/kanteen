import { combineReducers } from "redux";
import homeReducer from "../../features/homePage/homeSlice";
import wishlistReducer from "../../features/wishlist/wishlistSlice";

export default combineReducers({
  home: homeReducer,
  wishlist: wishlistReducer,
});
