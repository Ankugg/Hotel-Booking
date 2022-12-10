import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthApi } from "../context/AuthContext";

export const Store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAuthApi.middleware),
});

setupListeners(Store.dispatch);