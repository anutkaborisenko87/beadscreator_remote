import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        modalMode: 'login'
    },
    reducers: {
        openCloseModal: (state, action) => {
            state.isOpen = action.payload.open;
            state.modalMode = action.payload.mode;
        },
    }
});

export const {
    openCloseModal,
} = modalSlice.actions;

export default modalSlice.reducer;
