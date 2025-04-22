import { RootState } from '../store';

export const selectFavPsychologists = (state: RootState) => state.fav.items;
export const selectLastKeyFav = (state: RootState) => state.fav.lastKeyFav;
