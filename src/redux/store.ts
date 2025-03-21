import { configureStore } from "@reduxjs/toolkit";
import { psychologistsReducer } from "./psychologists/slice";

const store = configureStore({
  reducer: {
    psychologists: psychologistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;