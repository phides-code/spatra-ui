import { User } from '@auth0/auth0-react';
import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface UserProfile extends User {
    _id?: string;
    token?: string;
}

interface FetchResponseType {
    httpStatus: number;
    data: UserProfile;
}

interface UserProfileState {
    userProfile: UserProfile | null;
    status: 'idle' | 'loading' | 'failed';
}

interface FetchUserProfileProps {
    email: string;
    sub: string;
}

interface UpdateUserProfileProps {
    email: string;
    sub: string;
    update: ProfileUpdate;
}

export interface ProfileUpdate {
    token: string;
}

const initialState: UserProfileState = {
    userProfile: null,
    status: 'idle',
};

export const fetchUserProfile = createAsyncThunk(
    'userProfile/fetchUserProfile',
    async ({ email, sub }: FetchUserProfileProps) => {
        const rawFetchResponse = await fetch('/api/getUserProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, sub }),
        });
        const fetchResponse: FetchResponseType = await rawFetchResponse.json();

        return fetchResponse;
    }
);

export const updateUserProfile = createAsyncThunk(
    'userProfile/updateUserProfile',
    async ({ email, sub, update }: UpdateUserProfileProps) => {
        const rawFetchResponse = await fetch('/api/updateUserProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, sub, update }),
        });
        const fetchResponse: FetchResponseType = await rawFetchResponse.json();

        return fetchResponse;
    }
);

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userProfile = action.payload.data;
            })
            .addCase(fetchUserProfile.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const selectUserProfile = createSelector(
    (state: RootState) => state.userProfile,
    (userProfile) => userProfile.userProfile || null
);

export default userProfileSlice.reducer;
