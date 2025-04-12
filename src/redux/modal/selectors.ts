import { RootState } from '../store';

export const selectIsModalOpen = (state: RootState) => state.modals.isModalOpen;

export const selectModalType = (state: RootState) => state.modals.modalType;
