import { configureStore } from "@reduxjs/toolkit";
// import employeesReducer
import { apiSlice } from "./apiSlice";

export default configureStore({
  reducer: {
    // employees: employeesReducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})