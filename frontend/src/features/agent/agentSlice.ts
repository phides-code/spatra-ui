import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Agent {
    accountId: string;
    symbol: string;
    headquarters: string;
    credits: number;
}

interface ErrorMessage {
    message: string;
    code?: number;
}

interface FetchResponseType {
    data?: Agent;
    error?: ErrorMessage;
}

interface AgentState extends FetchResponseType {
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AgentState = {
    data: undefined,
    status: 'idle',
    error: undefined,
};

export const fetchAgent = createAsyncThunk(
    'agent/fetchAgent',
    async (token: string) => {
        const rawFetchResponse = await fetch(
            'https://api.spacetraders.io/v2/my/agent',
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

const agentSlice = createSlice({
    name: 'agent',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAgent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAgent.fulfilled, (state, action) => {
                state.status = 'idle';
                state.data = action.payload.data;
            })
            .addCase(fetchAgent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = {
                    message: action.error.message as string,
                };
            });
    },
});

export const selectAgent = createSelector(
    (state: RootState) => state.agent,
    (agent) => agent
);

export default agentSlice.reducer;
