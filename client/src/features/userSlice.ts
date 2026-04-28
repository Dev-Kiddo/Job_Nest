import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserInitialState } from "../types/userTypes";

export const registerUser = createAsyncThunk("user/registerUser", async (payload, { rejectWithValue }) => {
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

export const logoutUser = createAsyncThunk("user/logoutUser", async (_payload, { rejectWithValue }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Logout user failed");
    }

    // console.log("LOGOUT DATA", data);

    return data;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || "Something went wrong");
  }
});

export const forgotPassword = createAsyncThunk("user/forgotPassword", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = res.json();

    if (!res.ok) {
      return rejectWithValue("Forgot Password Failed");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || "Something went wrong");
  }
});

export const resetPassword = createAsyncThunk("user/resetPassword", async (payload, { rejectWithValue }) => {
  console.log("PAY", payload);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password?token=${payload.token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: payload.password, confirmPassword: payload.confirmPassword }),
    });

    const data = res.json();

    if (!res.ok) {
      return rejectWithValue("Reset Password Failed");
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
  redirectUrl: null,

  // Message State
  message: null,
  messageType: null,
  isMessageShown: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.currentUser = null;
    },
    clearMessage: (state) => {
      state.message = null;
      state.messageType = null;
      state.isMessageShown = false;
    },
    userMarkMessageAsShown: (state) => {
      state.isMessageShown = true;
    },
    activateAuthChecking(state) {
      state.authChecking = true;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.currentUser = action.payload.user;

        state.message = action.payload.message;
        state.messageType = "success";

        // console.log("action.payload", action.payload);

        // if (action.payload.redirectUrl) {
        //   state.authChecking = false;
        //   state.redirectUrl = action.payload.redirectUrl;
        // } else {
        //   state.authChecking = true;
        // }
        state.authChecking = true;

        state.isMessageShown = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.authChecking = false;
        state.message = action.payload as string;
        state.messageType = "error";
        state.isMessageShown = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.currentUser = action.payload.user;

        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload as string;
        state.messageType = "error";
        state.isMessageShown = false;
      })
      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;

        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload as string;
        state.messageType = "error";
        state.isMessageShown = false;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authChecking = false;

        state.currentUser = action.payload.user;

        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.authChecking = false;
        state.currentUser = null;

        state.message = action.payload as string;
        state.messageType = "error";
        state.isMessageShown = false;
      })
      // logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;

        state.currentUser = null;

        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload as string;
        state.messageType = "error";
        state.isMessageShown = false;
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;

        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload as string;
        state.messageType = "error";
        state.isMessageShown = false;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;

        state.message = null;
        state.messageType = null;
        state.isMessageShown = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = null;

        state.message = action.payload.message;
        state.messageType = "success";
        state.isMessageShown = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;

        state.message = action.payload as string;
        state.messageType = "error";
        state.isMessageShown = false;
      });
  },
});

export const { clearMessage, clearUser, userMarkMessageAsShown, activateAuthChecking } = userSlice.actions;

export default userSlice.reducer;
