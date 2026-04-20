import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userMarkMessageAsShown } from "./userSlice";

export const registerCompany = createAsyncThunk("company/registerCompany", async (payload, { rejectWithValue }) => {
  console.log("PAY", payload);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/company`, {
      method: "POST",
      credentials: "include",
      body: payload,
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Register company failed");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    console.log(rejectWithValue(err));

    return rejectWithValue(err.message || "Something went wrong");
  }
});

export const updateCompanyInfo = createAsyncThunk("company/updateCompanyInfo", async (payload, { rejectWithValue }) => {
  try {
    const apiPayload = payload;

    console.log("apiPayload", apiPayload);

    if (!apiPayload.companyId) {
      return rejectWithValue("Company ID is required to process");
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/company/${apiPayload.companyId.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload.payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Failed to update company info");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    console.log(err);
    rejectWithValue(err || "Something went wrong");
  }
});

const companySlice = createSlice({
  name: "company",
  initialState: {
    loading: false,
    error: null,
    company: null,

    // Message State
    message: null,
    messageType: null,
    isMessageShown: false,
  },
  reducers: {
    clearComapany: (state) => {
      state.company = null;
    },
    clearMessage(state) {
      state.message = null;
      state.messageType = null;
      state.isMessageShown = false;
    },
    companyMarkMessageAsShown(state) {
      state.isMessageShown = true;
    },
  },
  extraReducers: (builder) => {
    builder
      //? CREATE COMPAY INFO
      .addCase(registerCompany.pending, (state) => {
        state.loading = true;
        state.error = null;

        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload.company;
        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
        // localStorage.setItem("companyId", action.payload.company._id);
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.isMessageShown = false;
        state.messageType = "error";
      })
      //? UPDATE COMPANY INFO
      .addCase(updateCompanyInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(updateCompanyInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action?.payload?.updateCompany;
        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(updateCompanyInfo.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.isMessageShown = false;
        state.messageType = "error";
      });
  },
});

export const { clearComapany, clearMessage, companyMarkMessageAsShown } = companySlice.actions;
export default companySlice.reducer;
