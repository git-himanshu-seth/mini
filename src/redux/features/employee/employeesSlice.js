import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { employeeServices } from "../../services/employees.services";
import { commonFunctions } from "../../../assets/commonFunction";

const initialState = {
  value: null,
  employee: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getEmplooyesList = createAsyncThunk(
  "employees/getEmplooyesList",
  async (action, { rejectWithValue }) => {
    try {
      const res = await employeeServices.getEmployees(action);
      if (res?.meta?.code == 1) {
        commonFunctions.success(res.meta.message);
        return res.data;
      } else {
        return rejectWithValue(res?.meta?.message);
      }
    } catch (err) {
      return rejectWithValue(err?.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (action, { rejectWithValue }) => {
    try {
      const res = await employeeServices.updateEmployee(action);
      if (res?.meta?.code === 1) {
        commonFunctions.success(res.meta.message);
        return {};
      } else {
        commonFunctions.failed(res.meta.message);
        return rejectWithValue(res?.meta?.message || "Update employee failed");
      }
    } catch (err) {
      commonFunctions.failed(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (action, { rejectWithValue }) => {
    try {
      const res = await employeeServices.deleteEmployee(action);
      if (res?.meta?.code === 1) {
        commonFunctions.success(res.meta.message);
        return {};
      } else {
        commonFunctions.failed(res.meta.message);
        return rejectWithValue(res?.meta?.message || "Delete employee failed");
      }
    } catch (err) {
      commonFunctions.failed(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getEmployee = createAsyncThunk(
  "employees/getEmployee",
  async (action, { rejectWithValue }) => {
    try {
      const res = await employeeServices.getEmployee(action);
      if (res?.meta?.code === 1) {
        return res.data;
      } else {
        commonFunctions.failed(res.meta.message);
        return rejectWithValue(res?.meta?.message || "Fetch employee failed");
      }
    } catch (err) {
      commonFunctions.failed(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const updateEmployeeDepartment = createAsyncThunk(
  "employees/updateEmployeeDepartment",
  async (action, { rejectWithValue }) => {
    try {
      const res = await employeeServices.updateEmployeeDepartment(action);
      if (res?.meta?.code === 1) {
        commonFunctions.success(res.meta.message);
        return {};
      } else {
        commonFunctions.failed(res.meta.message);
        return rejectWithValue(
          res?.meta?.message || "Update employee department failed"
        );
      }
    } catch (err) {
      commonFunctions.failed(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmplooyesList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmplooyesList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
        state.error = "";
      })
      .addCase(getEmplooyesList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.status = "succeeded";
        state.value = {};
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEmployee.fulfilled, (state) => {
        state.status = "succeeded";
        state.value = {};
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employee = action.payload;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateEmployeeDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEmployeeDepartment.fulfilled, (state) => {
        state.status = "succeeded";
        state.value = {};
      })
      .addCase(updateEmployeeDepartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
