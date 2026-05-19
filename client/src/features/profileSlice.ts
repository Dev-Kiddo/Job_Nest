import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetAllState } from "./rootActions";

export const getCandidateProfile = createAsyncThunk("profile/getCandidateProfile", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/candidate/profile`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "failed to get candidate profile");
    }
    return data;
  } catch (error) {
    const err = error as Error;
    rejectWithValue(err || "Something went wrong");
  }
});

export const updateCandidateProfile = createAsyncThunk("profile/updateCandidateProfile", async (payload, { rejectWithValue }) => {
  // console.log("PAYLOAD", payload);

  const isFormData = payload instanceof FormData;

  // console.log("isFormData:", isFormData);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/candidate/profile`, {
      method: "PATCH",
      credentials: "include",
      headers: isFormData
        ? undefined
        : {
            "Content-Type": "application/json",
          },
      body: isFormData ? payload : JSON.stringify(payload),
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

const initialState = {
  candidate: {},
  loading: false,

  // Message State
  message: null,
  messageType: null,
  isMessageShown: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearCandidate: (state) => {
      state.candidate = {};
    },
    clearMessage: (state) => {
      state.message = null;
      state.messageType = null;
      state.isMessageShown = false;
    },
    profileMarkMessageAsShown: (state) => {
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
        // state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(getCandidateProfile.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload as string;
        state.messageType = "error";
        state.isMessageShown = false;
      })
      //? UPDATE CANDIDATE
      .addCase(updateCandidateProfile.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(updateCandidateProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.candidate = action.payload.updatedCandidate;
        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(updateCandidateProfile.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload as string;
        state.messageType = "error";
        state.isMessageShown = false;
      })
      // Reser State
      .addCase(resetAllState, () => initialState);
  },
});

export const { clearMessage, profileMarkMessageAsShown, clearCandidate } = profileSlice.actions;
export default profileSlice.reducer;
