import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './themeSlice'
import gridReducer from './gridSlice'

const store = configureStore({
    reducer: {
        themeMode: themeReducer,
        grid: gridReducer
    }
});

export default store;
