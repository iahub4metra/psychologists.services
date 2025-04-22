import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    ref,
    query,
    orderByKey,
    startAfter,
    limitToFirst,
    get,
} from 'firebase/database';
import { database } from '../../utils/firebase-config'; // імпортуємо нашу базу даних
import { Psychologist } from '../../components/App/Types';

interface FetchResponse {
    psychologists: Psychologist[];
    lastKey: string | null;
}

export const getPsychologists = createAsyncThunk<FetchResponse, string | null>(
    'psychologists/fetchAll',
    async (lastKey, thunkAPI) => {
        try {
            let psychologistsQuery = query(
                ref(database, 'psychologists'),
                orderByKey(),
                limitToFirst(3),
            );

            if (lastKey) {
                psychologistsQuery = query(
                    ref(database, 'psychologists'),
                    orderByKey(),
                    startAfter(lastKey),
                    limitToFirst(3),
                );
            }

            const snapshot = await get(psychologistsQuery);

            if (!snapshot.exists()) {
                return { psychologists: [], lastKey: null };
            }

            const data = snapshot.val();

            const psychologists = Object.values(data) as Psychologist[];

            const psychologistsWithId = psychologists.map((psychologist) => ({
                ...psychologist,
                id: `psychologist-${psychologist.name
                    .toLowerCase()
                    .replace(/^dr\.?\s*/i, '')
                    .trim()
                    .replace(/\s+/g, '-')}`,
            }));
            const newLastKey = Object.keys(data).pop() || null;

            return { psychologists: psychologistsWithId, lastKey: newLastKey };
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);
