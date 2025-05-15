import { RootState } from '../store';

export const selectFavPsychologists = (state: RootState) => state.fav.items;
export const selectErrorFav = (state: RootState) => state.fav.errorFav;
export const selectFetchError = (state: RootState) => state.fav.fetchError;
export const selectLoadingFav = (state: RootState) => state.fav.loadingFav;
export const selectPage = (state: RootState) => state.fav.page;
