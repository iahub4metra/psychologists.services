import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPsychologists } from './operations';
import { Psychologist } from '../../components/App/Types';

export type Filter =
    | 'all'
    | 'a-z'
    | 'z-a'
    | 'popular'
    | 'not-popular'
    | 'lower-price'
    | 'higher-price';

interface PsychologistsState {
    data: Psychologist[];
    lastKey: string | null;
    loading: boolean;
    error: string | null;
    openCardId: number | null;
    filter: Filter;
}

const initialState: PsychologistsState = {
    data: [],
    lastKey: null,
    loading: false,
    error: null,
    openCardId: null,
    filter: 'all',
};

const psychologistsSlice = createSlice({
    name: 'psychologists',
    initialState,
    reducers: {
        resetPsychologists: (state) => {
            state.data = [];
            state.lastKey = null;
        },
        toggleReviews: (state, action: PayloadAction<number>) => {
            state.openCardId =
                state.openCardId === action.payload ? null : action.payload;
        },
        setFilter: (state, action: PayloadAction<Filter>) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPsychologists.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPsychologists.fulfilled, (state, action) => {
                state.loading = false;
                const checkedData = action.payload.psychologists.filter(
                    (card) =>
                        !state.data.find((existing) => existing.id === card.id),
                );
                state.data = [...state.data, ...checkedData];
                state.lastKey = action.payload.lastKey;
            })
            .addCase(getPsychologists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetPsychologists, toggleReviews, setFilter } =
    psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
