import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/utils/types';

const initialState: User = {
    fullName: null,
    email: null,
    userImage: null,
    userType: "user",
    isVerified:false,
    isActive:false,
    isAuthenticated: false,
    accessToken:null,
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {

            state.fullName = action.payload?.fullName;
            state.email = action.payload?.email;
            state.userImage = action.payload?.userImage;
            state.isAuthenticated = action.payload?.isAuthenticated;
            state.isActive = action.payload?.isActive;
            state.isVerified = action.payload?.isVerified;
            state.accessToken = action.payload?.accessToken;

        },
    },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
