import { combineReducers } from "redux";
import entitiesReducer from "./reducers/entitiesReducer";

export default combineReducers({
  entities: entitiesReducer,
});
