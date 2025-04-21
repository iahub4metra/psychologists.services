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
}

const initialState: InitialValue = {
    user: null,
    isLoggedIn: false,
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
    },
});

export const { setUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
