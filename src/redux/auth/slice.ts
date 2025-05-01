import { createSlice } from '@reduxjs/toolkit';

export type User = {
    name: string;
    email: string;
    token: string;
    uid: string;
};

interface InitialValue {
    user: User | null;
    isLoggedIn: boolean;
    error: boolean;
}

const initialState: InitialValue = {
    user: null,
    isLoggedIn: false,
    error: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setUser, logout, setError } = authSlice.actions;

export const authReducer = authSlice.reducer;
