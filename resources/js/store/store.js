import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './themeSlice'
import gridReducer from './gridSlice'
import authUser from './authUserSlice'
import modalSlice from "./modalSlice.js";
import profileDataSlice from "@/store/profileDataSlice.js";

const store = configureStore({
    reducer: {
        themeMode: themeReducer,
        grid: gridReducer,
        authUser: authUser,
        modal: modalSlice,
        profileData: profileDataSlice,
    }
});

export default store;
