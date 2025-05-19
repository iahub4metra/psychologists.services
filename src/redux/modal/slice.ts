import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Psychologist } from '../../components/App/Types';

export type ModalType = 'login' | 'register' | 'appointment' | null;

interface initialValue {
    isModalOpen: boolean;
    modalType: ModalType;
    appointmentPsychologist: Psychologist | null;
    appointmentSnackBar: boolean;
    errorAppointmentSnackBar: boolean;
}

const initialState: initialValue = {
    isModalOpen: false,
    modalType: null,
    appointmentPsychologist: null,
    appointmentSnackBar: false,
    errorAppointmentSnackBar: false,
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
        setAppointmentSnackBar: (state) => {
            state.appointmentSnackBar = true;
        },
        resetAppointmentSnackBars: (state) => {
            state.appointmentSnackBar = false;
            state.errorAppointmentSnackBar = false;
        },
        errorAppointmentSnackBar: (state) => {
            state.errorAppointmentSnackBar = true;
        },
    },
});

export const {
    openModal,
    closeModal,
    setAppointmentPsychologist,
    resetAppointmentSnackBars,
    setAppointmentSnackBar,
    errorAppointmentSnackBar,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
