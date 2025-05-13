import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './themeSlice'
import gridReducer from './gridSlice'
import authUser from './authUserSlice'
import modalSlice from "./modalSlice.js";

const store = configureStore({
    reducer: {
        themeMode: themeReducer,
        grid: gridReducer,
        authUser: authUser,
        modal: modalSlice,
    }
});

export default store;
