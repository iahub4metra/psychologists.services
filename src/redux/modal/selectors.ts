import { RootState } from '../store';

export const selectIsModalOpen = (state: RootState) => state.modals.isModalOpen;

export const selectModalType = (state: RootState) => state.modals.modalType;
export const selectAppointmentPsychologist = (state: RootState) =>
    state.modals.appointmentPsychologist;
export const selectAppointmentSnackBar = (state: RootState) =>
    state.modals.appointmentSnackBar;
export const selectErrorAppointmentSnackBar = (state: RootState) =>
    state.modals.errorAppointmentSnackBar;
