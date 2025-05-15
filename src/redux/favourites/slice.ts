import { createSlice } from '@reduxjs/toolkit';
import { Psychologist } from '../../components/App/Types';
import {
    addFavouriteToDb,
    fetchFavourites,
    removeFavouriteToDb,
} from './operations';

interface InitialValue {
    items: Psychologist[];
    errorFav: string | null;
    fetchError: string | null;
    loadingFav: boolean;
    page: number;
}

const initialState: InitialValue = {
    items: [],
    errorFav: null,
    fetchError: null,
    loadingFav: false,
    page: 0,
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
        increasePage: (state) => {
            state.page += 1;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchFavourites.pending, (state) => {
                state.loadingFav = true;
            })
            .addCase(fetchFavourites.fulfilled, (state, action) => {
                state.loadingFav = false;
                const checkedData = action.payload.favourites
                    .filter(
                        (card) =>
                            !state.items.find(
                                (existing) => existing.id === card.id,
                            ),
                    )
                    .map((card) => card);
                state.items = [...state.items, ...checkedData];
                state.page = 1;
            })
            .addCase(fetchFavourites.rejected, (state) => {
                state.loadingFav = false;
                state.fetchError = 'Failed to load favourites';
            })
            .addCase(addFavouriteToDb.rejected, (state) => {
                state.errorFav = 'Failed to add to favourites';
            })
            .addCase(removeFavouriteToDb.rejected, (state) => {
                state.errorFav = 'Failed to remove from favourites';
            })
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.errorFav = null;
                },
            );
    },
});

export const {
    addFavPsychologistToState,
    removeFavPsychologistToState,
    clearAllFavourites,
    increasePage,
} = favouritesSlice.actions;

export const favouritesReducer = favouritesSlice.reducer;
