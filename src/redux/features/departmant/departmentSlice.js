import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { departmentServices } from "../../services/department.services";
import { commonFunctions } from "../../../assets/commonFunction";

const initialState = {
  value: null,
  status: "idle",
  error: null,
};

export const getDepartmentList = createAsyncThunk(
  "department",
  async (action, { rejectWithValue }) => {
    try {
      const res = await departmentServices.getDepartments(action);
      if (res?.meta?.code === 1) {
        commonFunctions.success(res.meta.message);
        return res.data;
      } else {
        return rejectWithValue(res?.meta?.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createDepartment = createAsyncThunk(
  "department/",
  async (action, { rejectWithValue }) => {
    try {
      const res = await departmentServices.createDepartment(action);
      if (res?.meta?.code === 1) {
        commonFunctions.success(res.meta.message);
        return {};
      } else {
        commonFunctions.failed(res.meta.message);
        return rejectWithValue(
          res?.meta?.message || "Create department failed"
        );
      }
    } catch (err) {
      commonFunctions.failed(err.message);
      return rejectWithValue(err.message);
    }
  }
);
export const updateDepartment = createAsyncThunk(
  "department/",
  async (action, { rejectWithValue }) => {
    try {
      const res = await departmentServices.updateDepartment(action);
      if (res?.meta?.code === 1) {
        commonFunctions.success(res.meta.message);
        return {};
      } else {
        commonFunctions.failed(res.meta.message);
        return rejectWithValue(
          res?.meta?.message || "Update department failed"
        );
      }
    } catch (err) {
      commonFunctions.failed(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const deleteDepartment = createAsyncThunk(
  "department/",
  async (action, { rejectWithValue }) => {
    try {
      const res = await departmentServices.deleteDepartment(action);
      if (res?.meta?.code === 1) {
        commonFunctions.success(res.meta.message);
        return {};
      } else {
        commonFunctions.failed(res.meta.message);
        return rejectWithValue(
          res?.meta?.message || "Create department failed"
        );
      }
    } catch (err) {
      commonFunctions.failed(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDepartmentList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDepartmentList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(getDepartmentList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDepartment.fulfilled, (state) => {
        state.status = "succeeded";
        state.value = {};
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default departmentSlice.reducer;
