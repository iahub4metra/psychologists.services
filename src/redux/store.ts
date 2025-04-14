import { configureStore } from '@reduxjs/toolkit';
import { psychologistsReducer } from './psychologists/slice';
import { modalReducer } from './modal/slice';
import { authReducer } from './auth/slice';

const store = configureStore({
    reducer: {
        psychologists: psychologistsReducer,
        modals: modalReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
