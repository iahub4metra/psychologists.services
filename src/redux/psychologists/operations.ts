import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Psychologist } from '../../components/App/Types';

axios.defaults.baseURL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

export const getPsychologists = createAsyncThunk<
  Psychologist[],
  void,
  { rejectValue: string }
>('psychologists/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get<Psychologist[]>(
      '/psychologists.json&page=1&per_page=3',
    );
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(axiosError.message);
  }
});
