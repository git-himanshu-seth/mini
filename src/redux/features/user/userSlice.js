import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authServices } from "../../services/auth.services";
import { commonFunctions } from "../../../assets/commonFunction";

const initialState = {
  value: 0,
  status: "idle",
  error: null,
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (action, { rejectWithValue }) => {
    try {
      const res = await authServices.login(action);
      if (res?.meta?.code === 1) {
        commonFunctions.success(res.meta.message);
        localStorage.setItem("accessToken", res.meta.accessToken);
        localStorage.setItem("refreshToken", res.meta.refreshToken);
        return {
          ...res.data,
          refreshToken: res.meta.refreshToken,
          accessToken: res.meta.accessToken,
        };
      } else {
        commonFunctions.failed(res?.message);
        return rejectWithValue(res?.message || "Login failed");
      }
    } catch (err) {
      commonFunctions.failed(err?.message);
      return rejectWithValue(err.message);
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async (action, { rejectWithValue }) => {
    try {
      const res = await authServices.register(action);
      if (res?.meta?.code === 1) {
        commonFunctions.success(res.meta.message);
        localStorage.setItem("accessToken", res.meta.accessToken);
        localStorage.setItem("refreshToken", res.meta.refreshToken);
        return {
          ...res.data,
          refreshToken: res.meta.refreshToken,
          accessToken: res.meta.accessToken,
        };
      } else {
        commonFunctions.failed(res?.meta?.message);
        return rejectWithValue(res?.meta?.message || "Registration failed");
      }
    } catch (err) {
      commonFunctions.failed(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const userLogOut = createAsyncThunk("user/logout", async () => {
  localStorage.clear();
  return {};
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userLogOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogOut.fulfilled, (state) => {
        state.status = "succeeded";
        state.value = 0;
      })
      .addCase(userLogOut.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
