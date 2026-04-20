import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import companyReducer from "../features/companySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
  },
});

export default store;
