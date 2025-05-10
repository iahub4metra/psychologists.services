import { createSlice } from '@reduxjs/toolkit';
import { Psychologist } from '../../components/App/Types';
import {
    addFavouriteToDb,
    fetchFavourites,
    removeFavouriteToDb,
} from './operations';

interface InitialValue {
    items: Psychologist[];
    lastTimeStampFav: string | null;
    hasMore: boolean | null;
    errorFav: string | null;
    fetchError: string | null;
    loadingFav: boolean;
    wasFetched: boolean;
}

const initialState: InitialValue = {
    items: [],
    lastTimeStampFav: null,
    hasMore: null,
    errorFav: null,
    fetchError: null,
    loadingFav: false,
    wasFetched: false,
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
                                (existing) =>
                                    existing.id === card.psychologist.id,
                            ),
                    )
                    .map((card) => card.psychologist);
                state.items = [...state.items, ...checkedData];
                state.hasMore = checkedData.length === 3;
                state.lastTimeStampFav = action.payload.lastTimeStamp;
                if (action.meta.arg.lastTimeStamp === null) {
                    state.wasFetched = true;
                }
            })
            .addCase(fetchFavourites.rejected, (state) => {
                state.loadingFav = false;
                state.fetchError = 'Failed to load favourites';
                state.wasFetched = true;
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
} = favouritesSlice.actions;

export const favouritesReducer = favouritesSlice.reducer;
