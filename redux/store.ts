import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./feature/userSlice";

const store = configureStore({
  reducer: counterSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
