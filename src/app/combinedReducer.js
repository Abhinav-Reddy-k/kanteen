import { combineReducers } from "redux";
import entitiesReducer from "./reducers/entitiesReducer";
import interfaceReducer from "./reducers/interfaceReducer";

export default combineReducers({
  entities: entitiesReducer,
  interface: interfaceReducer,
});
