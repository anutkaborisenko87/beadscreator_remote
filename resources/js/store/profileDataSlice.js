import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getProfileInfo} from "@/apiServuces/profileServices.js";

export const axiosProfileData = createAsyncThunk(
    'profileData/edit',
    async function (){
        return await getProfileInfo();
    }
);

const profileDataSlice = createSlice({
    name: 'profileData',
    initialState: {
        profileData: null,
    },
    reducers: {
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(axiosProfileData.fulfilled, (state, action) => {
            state.profileData = action.payload.data;
        })
    }
});

export const {
    setProfileData,
} = profileDataSlice.actions;

export default profileDataSlice.reducer;
