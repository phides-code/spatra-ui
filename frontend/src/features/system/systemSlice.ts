import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { Waypoint } from '../waypoint/waypointSlice';
import { RootState } from '../../app/store';

interface FetchResponseType {
    data?: Waypoint[];
    error?: ErrorMessage;
}

interface ErrorMessage {
    message: string;
    code?: number;
}

interface SystemState extends FetchResponseType {
    status: 'idle' | 'loading' | 'failed';
}

export interface FetchSystemProps {
    systemSymbol: string;
    token: string;
}

const initialState: SystemState = {
    data: undefined,
    status: 'idle',
    error: undefined,
};

export const fetchSystem = createAsyncThunk(
    'system/fetchSystem',
    async ({ systemSymbol, token }: FetchSystemProps) => {
        const rawFetchResponse = await fetch(
            `https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const fetchResponse: FetchResponseType = await rawFetchResponse.json();

        if (fetchResponse.error) {
            throw new Error(fetchResponse.error.message);
        }

        return fetchResponse;
    }
);

const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSystem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSystem.fulfilled, (state, action) => {
                state.status = 'idle';
                state.data = action.payload.data;
            })
            .addCase(fetchSystem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = {
                    message: action.error.message as string,
                };
            });
    },
});

export const selectSystem = createSelector(
    (state: RootState) => state.system,
    (system) => system
);

export default systemSlice.reducer;
