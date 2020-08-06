import { apiCallBegan, apiCallFailed, apiCallSuccess } from "../features/api";

const http = require("../services/httpService");

const api = (store) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) return next(action);
  next(action);
  const { url, onSuccess, onError, method, data, onLoading } = action.payload;

  try {
    const responce = await http.request({
      baseURL: "http://localhost:9001/api",
      url,
      method,
      data,
    });

    // specific
    if (onSuccess)
      return store.dispatch({ type: onSuccess, payload: responce.data });
    //general
    else store.dispatch(apiCallSuccess(responce.data));
  } catch (error) {
    // for specific errors
    if (onError) return store.dispatch({ type: onError, payload: error });
    // for general errors
    store.dispatch(apiCallFailed(error.message));
  }
};

export default api;
