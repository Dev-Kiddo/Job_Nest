import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  currentUser: any | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

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

const initialState: IInitialState = {
  currentUser: null,
  loading: false,
  error: null,
  message: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { removeError, removeMessage } = userSlice.actions;
export default userSlice.reducer;
