import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { ErrorMessage } from '../../common/ErrorMessage';
import { RootState } from '../../app/store';

export interface Contract {
    id: string;
    factionSymbol: string;
    type: string;
    terms: Terms;
    accepted: boolean;
    fulfilled: boolean;
    expiration: string;
    deadlineToAccept: string;
}

interface Terms {
    deadline: string;
    payment: Payment;
    deliver: Delivery[];
}

interface Payment {
    onAccepted: number;
    onFulfilled: number;
}

interface Delivery {
    tradeSymbol: string;
    destinationSymbol: string;
    unitsRequired: number;
    unitsFulfilled: number;
}

interface FetchResponseType {
    data?: Contract[];
    error?: ErrorMessage;
}

interface ContractsState extends FetchResponseType {
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ContractsState = {
    data: undefined,
    status: 'idle',
    error: undefined,
};

export const fetchMyContracts = createAsyncThunk(
    'contracts/fetchMyContracts',
    async (token: string) => {
        const rawFetchResponse = await fetch(
            'https://api.spacetraders.io/v2/my/contracts',
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

const contractsSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchMyContracts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMyContracts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.data = action.payload.data;
            })
            .addCase(fetchMyContracts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = {
                    message: action.error.message as string,
                };
            });
    },
});

export const selectMyContracts = createSelector(
    (state: RootState) => state.contracts,
    (contracts) => contracts
);

export default contractsSlice.reducer;
