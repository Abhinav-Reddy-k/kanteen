import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./combinedReducer";
import api from "./../middleware/api";

export default configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), api],
});
