import { RootState } from '../store';

export const selectFavPsychologists = (state: RootState) => state.fav.items;
export const selectLastTimeStampFav = (state: RootState) =>
    state.fav.lastTimeStampFav;
export const selectHasMore = (state: RootState) => state.fav.hasMore;
export const selectErrorFav = (state: RootState) => state.fav.errorFav;
export const selectFetchError = (state: RootState) => state.fav.fetchError;
export const selectLoadingFav = (state: RootState) => state.fav.loadingFav;
