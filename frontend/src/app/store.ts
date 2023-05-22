import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userProfileReducer from '../features/userProfile/userProfileSlice';
import agentReducer from '../features/agent/agentSlice';
import waypointReducer from '../features/waypoint/waypointSlice';

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        agent: agentReducer,
        waypoint: waypointReducer,
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
