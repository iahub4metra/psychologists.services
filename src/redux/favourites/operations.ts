import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    get,
    limitToFirst,
    orderByChild,
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
    lastTimeStamp?: string | null;
}

interface FetchResponse {
    favourites: {
        addedAt: string;
        psychologist: Psychologist;
    }[];
    lastTimeStamp: string | null;
}

export const addFavouriteToDb = createAsyncThunk<void, FavouritePayload>(
    'favourites/add',
    async ({ uid, psychologist }, thunkAPI) => {
        try {
            const favRef = ref(
                database,
                `favourites/${uid}/${psychologist.id}`,
            );
            await set(favRef, { psychologist, addedAt: Date.now() });
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
>('favourites/fetch', async ({ uid, lastTimeStamp }, thunkAPI) => {
    try {
        let favQuery = query(
            ref(database, `favourites/${uid}`),
            orderByChild('addedAt'),
            limitToFirst(3),
        );

        if (lastTimeStamp) {
            favQuery = query(
                ref(database, `favourites/${uid}`),
                orderByChild('addedAt'),
                startAfter(Number(lastTimeStamp)),
                limitToFirst(3),
            );
        }

        const snapshot = await get(favQuery);

        if (!snapshot.exists()) {
            return { favourites: [], lastTimeStamp: null };
        }

        const data = snapshot.val();

        const values = Object.values(data) as {
            psychologist: Psychologist;
            addedAt: number;
        }[];

        const last = values[values.length - 1]?.addedAt || null;

        return {
            favourites: values.map((entry) => ({
                psychologist: entry.psychologist,
                addedAt: entry.addedAt.toString(),
            })),
            lastTimeStamp: last?.toString() || null,
        };
    } catch {
        return thunkAPI.rejectWithValue('Failed to fetch favourites');
    }
});
