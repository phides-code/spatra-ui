import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Faction {
    _id: string;
    symbol: string;
    name: string;
    description: string;
    headquarters: string;
    traits: Trait[];
    isRecruiting: boolean;
}

interface Trait {
    symbol: string;
    name: string;
    description: string;
}

interface FetchResponseType {
    httpStatus: number;
    data: Faction[];
}

interface FactionsState {
    factions: Faction[] | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: FactionsState = {
    factions: null,
    status: 'idle',
};

const fetchFactions = createAsyncThunk('factions/fetchFactions', async () => {
    const rawFetchResponse = await fetch('/api/getFactions');

    const fetchResponse: FetchResponseType = await rawFetchResponse.json();

    return fetchResponse;
});

const factionsSlice = createSlice({
    name: 'factions',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchFactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFactions.fulfilled, (state, action) => {
                state.status = 'idle';
                state.factions = action.payload.data;
            })
            .addCase(fetchFactions.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const selectFactions = createSelector(
    (state: RootState) => state.factions,
    (factions) => factions.factions || null
);

export default factionsSlice.reducer;
