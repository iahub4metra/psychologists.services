import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPsychologists } from './operations';
import { Psychologist } from '../../components/App/Types';

interface PsychologistsState {
    data: Psychologist[];
    lastKey: string | null;
    loading: boolean;
    error: string | null;
    openCardId: number | null;
}

const initialState: PsychologistsState = {
    data: [],
    lastKey: null,
    loading: false,
    error: null,
    openCardId: null,
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPsychologists.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPsychologists.fulfilled, (state, action) => {
                state.loading = false;
                const newPsychologists = action.payload.psychologists;

                // Фільтруємо лише нові, яких ще немає в state.data
                const uniquePsychologists = newPsychologists.filter(
                    (newPsychologist) =>
                        !state.data.some(
                            (existing) => existing.id === newPsychologist.id,
                        ),
                );

                // Додаємо тільки унікальні
                state.data.push(...uniquePsychologists);
                state.lastKey = action.payload.lastKey;
            })
            .addCase(getPsychologists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetPsychologists, toggleReviews } = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
