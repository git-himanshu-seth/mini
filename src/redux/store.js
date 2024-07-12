import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware, compose } from "redux";
import counterReducer from "./features/counter/counterSlice";
// import { createLogger } from "redux-logger";

// const loogerMiddleware = createLogger();
export const store = configureStore(
  {
    reducer: {
      counter: counterReducer,
    },
  }
  // applyMiddleware()
);
