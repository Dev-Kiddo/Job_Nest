import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import companyReducer from "../features/companySlice";
import candidateReducer from "../features/candidateSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    candidate: candidateReducer,
  },
});

export default store;
