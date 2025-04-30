import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Psychologist } from '../../components/App/Types';

export type ModalType = 'login' | 'register' | 'appointment' | null;

interface initialValue {
    isModalOpen: boolean;
    modalType: ModalType;
    appointmentPsychologist: Psychologist | null;
}

const initialState: initialValue = {
    isModalOpen: false,
    modalType: null,
    appointmentPsychologist: null,
};

const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ModalType>) => {
            state.isModalOpen = true;
            state.modalType = action.payload;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.modalType = null;
        },
        setAppointmentPsychologist: (
            state,
            action: PayloadAction<Psychologist>,
        ) => {
            state.appointmentPsychologist = action.payload;
        },
    },
});

export const { openModal, closeModal, setAppointmentPsychologist } =
    modalSlice.actions;

export const modalReducer = modalSlice.reducer;
