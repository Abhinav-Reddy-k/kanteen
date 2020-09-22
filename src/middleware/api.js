import { apiCallBegan, apiCallFailed, apiCallSuccess } from "../features/api";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

axios.interceptors.response.use(null, function (error) {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error("An Unexpected Error Occured");
  }

  return Promise.reject(error);
});

const api = (store) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) return next(action);
  next(action);
  const { url, onSuccess, onError, method, data } = action.payload;

  try {
    const responce = await axios({
      baseURL: "http://localhost:3000/api",
      url,
      method,
      data,
      onSuccess,
      onError,
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
export const http = { get: axios.get, post: axios.post };
