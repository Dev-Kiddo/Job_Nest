import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserInitialState } from "../types/userTypes";

export const registerUser = createAsyncThunk("user/registerUser", async (payload, { rejectWithValue }) => {
  if (!payload) {
    return rejectWithValue("Payload not found!");
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Register user failed");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || "Something went wrong");
  }
});

export const loginUser = createAsyncThunk("user/loginUser", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    // if (!res) {
    //   throw new Error("An error occured");
    // }

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || "Something went wrong");
  }
});

export const verifyEmail = createAsyncThunk("user/verifyEmail", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${payload}`, { method: "GET" });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Verify email failed");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || "Something went wrong");
  }
});

export const getCurrentUser = createAsyncThunk("user/oauthRegister", async (_payload, { rejectWithValue }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Fetch current user failed");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || "Something went wrong");
  }
});

const initialState: UserInitialState = {
  currentUser: null,
  authChecking: true,
  loading: false,
  error: null,
  message: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeError(state) {
      state.error = null;
    },
    removeMessage(state) {
      state.message = null;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentUser = action.payload.user;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authChecking = false;

        state.error = null;
        state.currentUser = action.payload.user;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.authChecking = false;

        state.currentUser = null;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { removeError, removeMessage, clearUser } = userSlice.actions;
export default userSlice.reducer;
