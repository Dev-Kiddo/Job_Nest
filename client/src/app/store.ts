import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import companyReducer from "../features/companySlice";
import profileSlice from "../features/profileSlice";
import jobSlice from "../features/jobSlice";
import applicationSlice from "../features/applicationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    profile: profileSlice,
    job: jobSlice,
    application: applicationSlice,
  },
});

export default store;
