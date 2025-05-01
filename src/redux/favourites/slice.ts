import { createSlice } from '@reduxjs/toolkit';
import { Psychologist } from '../../components/App/Types';
import { fetchFavourites } from './operations';

interface InitialValue {
    items: Psychologist[];
    lastTimeStampFav: string | null;
    hasMore: boolean | null;
}

const initialState: InitialValue = {
    items: [],
    lastTimeStampFav: null,
    hasMore: null,
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
            const checkedData = action.payload.favourites
                .filter(
                    (card) =>
                        !state.items.find(
                            (existing) => existing.id === card.psychologist.id,
                        ),
                )
                .map((card) => card.psychologist);
            state.items = [...state.items, ...checkedData];
            console.log(checkedData);

            state.hasMore = action.payload.favourites.length === 3;
            state.lastTimeStampFav = action.payload.lastTimeStamp;
        });
    },
});

export const {
    addFavPsychologistToState,
    removeFavPsychologistToState,
    clearAllFavourites,
} = favouritesSlice.actions;

export const favouritesReducer = favouritesSlice.reducer;
