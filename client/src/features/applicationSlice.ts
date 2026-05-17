import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllApplications = createAsyncThunk("application/getAllApplications", async (payload, { rejectWithValue }) => {
  try {
    let url = `${import.meta.env.VITE_API_URL}`;

    if (payload.label === "applications") {
      url = `${url}/api/application`;
    }

    if (payload.label === "appliedCandidates") {
      url = `${url}/api/application?job=6a06ff798b90456e903c4d4e`;
    }

    const res = await fetch(`${url}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message);
    }

    return data;
  } catch (error) {
    const err = error as Error;
    rejectWithValue(err || "Something went wrong");
  }
});

export const createApplication = createAsyncThunk("application/createApplication", async (payload, { rejectWithValue }) => {
  // console.log("PAYLOAD", payload);

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

export const updateApplicationStatus = createAsyncThunk("application/updateApplicationStatus", async (payload, { rejectWithValue }) => {
  try {
    console.log("PAYLOAD", payload);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/application/${payload.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.applicationStatus),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Failed to update status");
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
      })
      .addCase(getAllApplications.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(getAllApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload.application;

        // state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(getAllApplications.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload.message;
        state.messageType = "error";
        state.isMessageShown = false;
      })
      //? Application Update Status
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const updateApplication = action.payload.application;

        const findUpdateIndex = state.applications.findIndex((el) => el._id === updateApplication._id);

        state.loading = false;
        state.applications[findUpdateIndex] = updateApplication;

        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload.message;
        state.messageType = "error";
        state.isMessageShown = false;
      });
  },
});

export const { clearApplication, clearMessage, clearSelectedApplication, applicationMarkMessageAsShown } = applicationSlice.actions;

export default applicationSlice.reducer;
