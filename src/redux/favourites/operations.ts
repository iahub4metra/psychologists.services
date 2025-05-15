import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, ref, remove, set } from 'firebase/database';
import { database } from '../../utils/firebase-config';
import { Psychologist } from '../../components/App/Types';

interface FavouritePayload {
    uid: string;
    psychologist: Psychologist;
}

interface FetchPayload {
    uid: string;
}

interface FetchResponse {
    favourites: Psychologist[];
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
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
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
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const fetchFavourites = createAsyncThunk<
    FetchResponse,
    FetchPayload,
    { rejectValue: string }
>('favourites/fetch', async ({ uid }, thunkAPI) => {
    try {
        const favRef = ref(database, `favourites/${uid}`);

        const snapshot = await get(favRef);

        if (!snapshot.exists()) {
            return { favourites: [] };
        }

        const data = snapshot.val();

        const favourites = Object.values(data) as Psychologist[];

        return {
            favourites,
        };
    } catch {
        return thunkAPI.rejectWithValue('Failed to fetch favourites');
    }
});
