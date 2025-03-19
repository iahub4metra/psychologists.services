import { createSlice } from "@reduxjs/toolkit"
import { getPsychologists } from "./operations"
import { Psychologist } from "../../components/App/Types"

export interface InitialState{
    items: Psychologist[]
}

const initialValue: InitialState = {
    items: []
}

const psychologistsSlice = createSlice({
    name: 'psychologists',
    initialState: initialValue,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPsychologists.fulfilled, (state: InitialState, action) => {
                state.items = action.payload
            })
        
    },
})

export const psychologistsReducer = psychologistsSlice.reducer