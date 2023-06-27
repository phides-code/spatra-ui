import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { Ship } from '../ships/shipsSlice';
import { RootState } from '../../app/store';
import { ErrorMessage } from '../../common/ErrorMessage';

interface FetchResponseType {
    data?: Ship;
    error?: ErrorMessage;
}

interface ShipState extends FetchResponseType {
    status: 'idle' | 'loading' | 'failed';
}

export interface FetchShipProps {
    token: string;
    shipSymbol: string;
}

const initialState: ShipState = {
    data: undefined,
    status: 'idle',
    error: undefined,
};

export const fetchShip = createAsyncThunk(
    'ship/fetchShip',
    async ({ token, shipSymbol }: FetchShipProps) => {
        const rawFetchResponse = await fetch(
            `https://api.spacetraders.io/v2/my/ships/${shipSymbol}`,
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

const shipSlice = createSlice({
    name: 'ship',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchShip.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchShip.fulfilled, (state, action) => {
                state.status = 'idle';
                state.data = action.payload.data;
            })
            .addCase(fetchShip.rejected, (state, action) => {
                state.status = 'failed';
                state.error = {
                    message: action.error.message as string,
                };
            });
    },
});

export const selectShip = createSelector(
    (state: RootState) => state.ship,
    (ship) => ship
);

export default shipSlice.reducer;
