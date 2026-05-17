import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchJobs = createAsyncThunk("job/fetchJobs", async (payload, { rejectWithValue }) => {
  try {
    // console.log("Fetch Job Payload", payload);

    let url = `${import.meta.env.VITE_API_URL}`;

    if (payload.label === "getJobs") {
      url = `${url}/api/jobs`;
    }

    if (payload.label === "search") {
      url = `${url}/api/jobs?search=${payload?.data?.title}`;
    }

    if (payload.label === "companyJobs") {
      url = `${url}/api/jobs?company=${payload.data}&limit=10`;
    }

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    // console.log("Fetch Job DATA", data);

    if (!res.ok) {
      return rejectWithValue(data.message || "Failed to get jobs");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    rejectWithValue(err || "Something went wrong");
  }
});

export const fetchSingleJob = createAsyncThunk("job/fetchSingleJob", async function (payload, { rejectWithValue }) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${payload}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Failed to get job");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    rejectWithValue(err || "Something went wrong");
  }
});

export const fetchCategories = createAsyncThunk("job/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/category?fields=name`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Failed to fetch categories");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    rejectWithValue(err || "Something went wrong");
  }
});

export const createJobHandler = createAsyncThunk("job/createJobHandler", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Failed to create Job");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    rejectWithValue(err || "Something went wrong");
  }
});

const initialState = {
  loading: false,
  jobs: null,
  selectedJob: null,
  categories: null,

  message: null,
  messageType: null,
  isMessageShown: false,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    clearJobs: function (state) {
      state.jobs = null;
    },
    clearMessage(state) {
      state.message = null;
      state.messageType = null;
      state.isMessageShown = false;
    },
    clearSelectedJob(state) {
      state.selectedJob = null;
    },
    jobMarkMessageAsShown: (state) => {
      state.isMessageShown = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        // console.log("action", action.payload);

        state.loading = false;
        state.jobs = action.payload.jobs;

        // state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Failed to get jobs";
        state.messageType = "error";
        state.isMessageShown = false;
      })
      //   Fetch single Job
      .addCase(fetchSingleJob.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(fetchSingleJob.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload.job;

        // state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(fetchSingleJob.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload.message || "Failed to get jobs";
        state.messageType = "error";
        state.isMessageShown = false;
      })
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.category;

        // state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload.message || "Failed to get categories";
        state.messageType = "error";
        state.isMessageShown = false;
      })
      .addCase(createJobHandler.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(createJobHandler.fulfilled, (state, action) => {
        state.loading = false;

        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(createJobHandler.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload.message || "Failed to create job!";
        state.messageType = "error";
        state.isMessageShown = false;
      });
  },
});

export const { clearJobs, clearMessage, jobMarkMessageAsShown } = jobSlice.actions;
export default jobSlice.reducer;
