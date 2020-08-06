import { combineReducers } from "redux";
import loginReducer from "../../features/loginPage/loginSlice";

export default combineReducers({
  login: loginReducer,
});
