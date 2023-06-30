import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { ErrorMessage } from '../../common/ErrorMessage';
import { Contract } from '../contracts/contractsSlice';
import { RootState } from '../../app/store';

interface FetchResponseType {
    data?: Contract;
    error?: ErrorMessage;
}

interface ContractState extends FetchResponseType {
    status: 'idle' | 'loading' | 'failed';
}

export interface FetchContractProps {
    token: string;
    contractId: string;
}

const initialState: ContractState = {
    data: undefined,
    status: 'idle',
    error: undefined,
};

export const fetchContract = createAsyncThunk(
    'contract/fetchContract',
    async ({ token, contractId }: FetchContractProps) => {
        const rawFetchResponse = await fetch(
            `https://api.spacetraders.io/v2/my/contracts/${contractId}`,
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

const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchContract.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchContract.fulfilled, (state, action) => {
                state.status = 'idle';
                state.data = action.payload.data;
            })
            .addCase(fetchContract.rejected, (state, action) => {
                state.status = 'failed';
                state.error = {
                    message: action.error.message as string,
                };
            });
    },
});

export const selectContract = createSelector(
    (state: RootState) => state.contract,
    (contract) => contract
);

export default contractSlice.reducer;
