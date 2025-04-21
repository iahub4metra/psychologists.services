import { createSlice } from '@reduxjs/toolkit';
import { Psychologist } from '../../components/App/Types';
import { fetchFavourites } from './operations';

interface InitialValue {
    items: Psychologist[];
}

const initialState: InitialValue = {
    items: [],
};

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addFavPsychologistToState: (state, action) => {
            state.items.push(action.payload);
        },
        removeFavPsychologistToState: (state, action) => {
            const existingFavIndex = state.items.findIndex(
                (object) => action.payload === object.id,
            );
            state.items.splice(existingFavIndex, 1);
        },
        clearAllFavourites: (state) => {
            state.items = [];
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchFavourites.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export const {
    addFavPsychologistToState,
    removeFavPsychologistToState,
    clearAllFavourites,
} = favouritesSlice.actions;

export const favouritesReducer = favouritesSlice.reducer;
