import { configureStore } from '@reduxjs/toolkit';
import { psychologistsReducer } from './psychologists/slice';
import { modalReducer } from './modal/slice';

const store = configureStore({
  reducer: {
    psychologists: psychologistsReducer,
    modals: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
