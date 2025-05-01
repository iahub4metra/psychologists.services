import { RootState } from '../store';

export const selectFavPsychologists = (state: RootState) => state.fav.items;
export const selectLastTimeStampFav = (state: RootState) =>
    state.fav.lastTimeStampFav;
export const selectHasMore = (state: RootState) => state.fav.hasMore;
