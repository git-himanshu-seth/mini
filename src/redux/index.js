import { combineReducers } from "redux";
import authReducer from "./features/user/userSlice";
import departmentReducer from "./features/departmant/departmentSlice";
import employeeReducer from "./features/employee/employeesSlice";
const appReducers = combineReducers({
  user: authReducer,
  department: departmentReducer,
  employees: employeeReducer,
});

const rootReducer = (state, action) => {
  return appReducers(state, action);
};

export default rootReducer;
