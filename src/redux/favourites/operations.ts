import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, ref, remove, set } from 'firebase/database';
import { database } from '../../utils/firebase-config';
import { Psychologist } from '../../components/App/Types';

interface FavouritePayload {
    uid: string;
    psychologist: Psychologist;
}

export const addFavouriteToDb = createAsyncThunk<void, FavouritePayload>(
    'favourites/add',
    async ({ uid, psychologist }, thunkAPI) => {
        try {
            const favRef = ref(
                database,
                `favourites/${uid}/${psychologist.id}`,
            );
            await set(favRef, psychologist);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

export const removeFavouriteToDb = createAsyncThunk<void, FavouritePayload>(
    'favourites/remove',
    async ({ uid, psychologist }, thunkAPI) => {
        try {
            const favRef = ref(
                database,
                `favourites/${uid}/${psychologist.id}`,
            );
            await remove(favRef);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

export const fetchFavourites = createAsyncThunk<Psychologist[], string>(
    'favourites/fetch',
    async (uid, thunkAPI) => {
        try {
            const favRef = ref(database, `favourites/${uid}`);
            const snapshot = await get(favRef);
            const data = snapshot.val() || {};
            const favourites = Object.values(data) as Psychologist[];
            return favourites;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);
