import { RootState } from '../store';

export const selectFavPsychologists = (state: RootState) => state.fav.items;
