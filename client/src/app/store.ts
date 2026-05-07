import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import companyReducer from "../features/companySlice";
import profileSlice from "../features/profileSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    profile: profileSlice,
  },
});

export default store;
