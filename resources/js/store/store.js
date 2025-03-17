import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './themeSlice'

const store = configureStore({
    reducer: {
        themeMode: themeReducer,
    }
});

export default store;
