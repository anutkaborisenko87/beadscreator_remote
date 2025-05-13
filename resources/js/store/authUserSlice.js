import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const authUser = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = authUser.actions;
export default authUser.reducer;
