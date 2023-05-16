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

interface FetchResponseType {
    data: Agent;
}

interface AgentState {
    agent: Agent | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AgentState = {
    agent: null,
    status: 'idle',
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
                state.agent = action.payload.data;
            })
            .addCase(fetchAgent.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const selectAgent = createSelector(
    (state: RootState) => state.agent,
    (agent) => agent.agent || null
);

export default agentSlice.reducer;
