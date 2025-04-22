import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    get,
    limitToFirst,
    orderByKey,
    query,
    ref,
    remove,
    set,
    startAfter,
} from 'firebase/database';
import { database } from '../../utils/firebase-config';
import { Psychologist } from '../../components/App/Types';

interface FavouritePayload {
    uid: string;
    psychologist: Psychologist;
}

interface FetchPayload {
    uid: string;
    lastKey?: string | null;
}

interface FetchResponse {
    favourites: Psychologist[];
    lastKey: string | null;
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

export const fetchFavourites = createAsyncThunk<FetchResponse, FetchPayload>(
    'favourites/fetch',
    async ({ uid, lastKey }, thunkAPI) => {
        try {
            let favRef = query(
                ref(database, `favourites/${uid}`),
                orderByKey(),
                limitToFirst(3),
            );

            if (lastKey) {
                favRef = query(
                    ref(database, `favourites/${uid}`),
                    orderByKey(),
                    startAfter(lastKey),
                    limitToFirst(3),
                );
            }

            const snapshot = await get(favRef);

            if (!snapshot.exists()) {
                return { favourites: [], lastKey: null };
            }

            const data = snapshot.val();
            const favourites = Object.values(data) as Psychologist[];
            const newLastKey = Object.keys(data).pop() || null;
            return { favourites, lastKey: newLastKey };
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);
