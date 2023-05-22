import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Waypoint {
    systemSymbol: string;
    symbol: string;
    type: string;
    x: number;
    y: number;
    orbitals: Orbital[];
    traits: Trait[];
    chart: Chart;
    faction: Faction;
}

interface Orbital {
    symbol: string;
}

export interface Trait {
    symbol: string;
    name: string;
    description: string;
}

interface Chart {
    submittedBy: string;
    submittedOn: string;
}

interface Faction {
    symbol: string;
}

interface ErrorMessage {
    message: string;
    code?: number;
}

interface FetchResponseType {
    data?: Waypoint;
    error?: ErrorMessage;
}

interface WaypointState extends FetchResponseType {
    status: 'idle' | 'loading' | 'failed';
}

export interface FetchWaypointProps {
    waypointSymbol: string;
    token: string;
}

const initialState: WaypointState = {
    data: undefined,
    status: 'idle',
    error: undefined,
};

export const fetchWaypoint = createAsyncThunk(
    'waypoint/fetchWaypoint',
    async ({ waypointSymbol, token }: FetchWaypointProps) => {
        const system = waypointSymbol.split('-').slice(0, 2).join('-');
        const rawFetchResponse = await fetch(
            `https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypointSymbol}`,
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

const waypointSlice = createSlice({
    name: 'waypoint',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchWaypoint.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWaypoint.fulfilled, (state, action) => {
                state.status = 'idle';
                state.data = action.payload.data;
            })
            .addCase(fetchWaypoint.rejected, (state, action) => {
                state.status = 'failed';
                state.error = {
                    message: action.error.message as string,
                };
            });
    },
});

export const selectWaypoint = createSelector(
    (state: RootState) => state.waypoint,
    (waypoint) => waypoint
);

export default waypointSlice.reducer;
