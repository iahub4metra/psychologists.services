import { RootState } from '../store';

export const selectPsychologists = (state: RootState) =>
    state.psychologists.data;
export const selectLastKey = (state: RootState) => state.psychologists.lastKey;
export const selectLoading = (state: RootState) => state.psychologists.loading;
export const selectOpenCardId = (state: RootState) =>
    state.psychologists.openCardId;
export const selectFilter = (state: RootState) => state.psychologists.filter;
