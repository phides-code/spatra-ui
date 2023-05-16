import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userProfileReducer from '../features/userProfile/userProfileSlice';
import agentReducer from '../features/agent/agentSlice';

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        agent: agentReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
