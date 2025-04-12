import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalType = 'login' | 'register' | null;

interface initialValue {
  isModalOpen: boolean;
  modalType: ModalType;
}

const initialState: initialValue = {
  isModalOpen: false,
  modalType: null,
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
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
