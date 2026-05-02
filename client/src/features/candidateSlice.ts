import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentCompany } from "./companySlice";

const initialState = {
  candidate: null,
  loading: false,

  // Message State
  message: null,
  messageType: null,
  isMessageShown: false,
};

export const getCandidateProfile = createAsyncThunk("candidate/getCandidateProfile", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/candidate/profile`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    // console.log("CANDIDATE DATA", data);

    if (!res.ok) {
      return rejectWithValue(data.message || "failed to get candidate profile");
    }

    // console.log("CANDIDATE DATA", data);

    return data;
  } catch (error) {
    const err = error as Error;
    rejectWithValue(err || "Something went wrong");
  }
});

export const updateCandidaeProfile = createAsyncThunk(async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URl}/api/candidate/update-profile`, {
      method: "PATCH",
      credentials: "include",
      body: payload,
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Failed to update candidate");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    rejectWithValue(err || "Something went wrong");
  }
});

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    clearCandidate: (state) => {
      state.candidate = null;
    },
    clearMessage: (state) => {
      state.message = null;
      state.messageType = null;
      state.isMessageShown = false;
    },
    userMarkMessageAsShown: (state) => {
      state.isMessageShown = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCandidateProfile.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(getCandidateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.candidate = action.payload.user;
        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(getCandidateProfile.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload as string;
        state.messageType = "error";
        state.isMessageShown = false;
      })
      //   UPDATE CANDIDATE PROFILE
      .addCase(updateCandidaeProfile.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(updateCandidaeProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.candidate = action.payload.updatedCandidate;
        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(updateCandidaeProfile.rejected, (state) => {
        state.loading = false;

        state.message = action.payload as string;
        state.messageType = "error";
        state.isMessageShown = false;
      });
  },
});

export const { clearMessage } = candidateSlice.actions;
export default candidateSlice.reducer;
