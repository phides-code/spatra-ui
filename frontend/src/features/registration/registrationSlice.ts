import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { ErrorMessage } from '../../common/ErrorMessage';
import { Agent } from '../agent/agentSlice';
import { Faction } from '../factions/factionsSlice';
import { Ship } from '../ships/shipsSlice';
import { RootState } from '../../app/store';
import { Contract } from '../contracts/contractsSlice';

export interface Registration {
    token: string;
    agent: Agent;
    contract: Contract;
    faction: Faction;
    ship: Ship;
}

interface FetchResponseType {
    data?: Registration;
    error?: ErrorMessage;
}

interface RegistrationState extends FetchResponseType {
    status: 'idle' | 'loading' | 'failed';
}

export interface PostRegistrationProps {
    callsign: string;
    faction: Faction['symbol'];
}

const initialState: RegistrationState = {
    data: undefined,
    status: 'idle',
    error: undefined,
};

export const postRegistration = createAsyncThunk(
    'registration/postRegistration',
    async ({ callsign, faction }: PostRegistrationProps) => {
        const rawFetchResponse = await fetch(
            'https://api.spacetraders.io/v2/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    symbol: callsign,
                    faction,
                }),
            }
        );

        const fetchResponse: FetchResponseType = await rawFetchResponse.json();

        if (fetchResponse.error) {
            throw new Error(fetchResponse.error.message);
        }

        return fetchResponse;
    }
);

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(postRegistration.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postRegistration.fulfilled, (state, action) => {
                state.status = 'idle';
                state.data = action.payload.data;
            })
            .addCase(postRegistration.rejected, (state, action) => {
                state.status = 'failed';
                state.error = {
                    message: action.error.message as string,
                };
            });
    },
});

export const selectRegistration = createSelector(
    (state: RootState) => state.registration,
    (registration) => registration
);

export default registrationSlice.reducer;
