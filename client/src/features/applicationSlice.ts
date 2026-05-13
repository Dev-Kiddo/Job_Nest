import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createApplication = createAsyncThunk("application/createApplication", async (payload, { rejectWithValue }) => {
  console.log("PAYLOAD", payload);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/application`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Failed to create application");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    rejectWithValue(err || "Something went wrong");
  }
});

const initialState = {
  loading: false,
  applications: null,
  selectedApplication: null,

  message: null,
  messageType: null,
  isMessageShown: false,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    clearApplication: function (state) {
      state.applications = null;
    },
    clearMessage(state) {
      state.message = null;
      state.messageType = null;
      state.isMessageShown = false;
    },
    clearSelectedApplication(state) {
      state.selectedApplication = null;
    },
    applicationMarkMessageAsShown: (state) => {
      state.isMessageShown = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createApplication.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.loading = false;

        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload.message;
        state.messageType = "error";
        state.isMessageShown = false;
      });
  },
});

export const { clearApplication, clearMessage, clearSelectedApplication, applicationMarkMessageAsShown } = applicationSlice.actions;

export default applicationSlice.reducer;
