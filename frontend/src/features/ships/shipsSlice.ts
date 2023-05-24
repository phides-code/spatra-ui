import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Coordinate {
    x: number;
    y: number;
}

interface Waypoint extends Coordinate {
    symbol: string;
    type: string;
    systemSymbol: string;
}

interface Departure extends Waypoint {
    departureTime: string;
}

interface Destination extends Waypoint {
    arrival: string;
}

interface Route {
    departure: Departure;
    destination: Destination;
    arrival: string;
    departureTime: string;
}

interface Nav {
    systemSymbol: string;
    waypointSymbol: string;
    route: Route;
    status: string;
    flightMode: string;
}

interface Crew {
    current: number;
    capacity: number;
    required: number;
    rotation: string;
    morale: number;
    wages: number;
}

interface ConsumedFuel {
    amount: number;
    timestamp: string;
}

interface Fuel {
    current: number;
    capacity: number;
    consumed: ConsumedFuel;
}

interface ModuleRequirements {
    crew: number;
    power: number;
    slots: number;
}

interface Module {
    symbol: string;
    name: string;
    description: string;
    capacity?: number;
    requirements: ModuleRequirements;
}

interface MountRequirements {
    crew: number;
    power: number;
}

interface Mount {
    symbol: string;
    name: string;
    description: string;
    strength: number;
    requirements: MountRequirements;
    deposits?: string[];
}

interface FrameRequirements {
    power: number;
    crew: number;
}

export interface Frame {
    symbol: string;
    name: string;
    description: string;
    moduleSlots: number;
    mountingPoints: number;
    fuelCapacity: number;
    condition: number;
    requirements: FrameRequirements;
}

interface ReactorRequirements {
    crew: number;
}

interface Reactor {
    symbol: string;
    name: string;
    description: string;
    condition: number;
    powerOutput: number;
    requirements: ReactorRequirements;
}

interface EngineRequirements {
    power: number;
    crew: number;
}

interface Engine {
    symbol: string;
    name: string;
    description: string;
    condition: number;
    speed: number;
    requirements: EngineRequirements;
}

interface ShipRegistration {
    name: string;
    factionSymbol: string;
    role: string;
}

interface CargoItem {
    symbol: string;
    name: string;
    description: string;
    units: number;
}

interface Cargo {
    capacity: number;
    units: number;
    inventory: CargoItem[];
}

export interface Ship {
    symbol: string;
    nav: Nav;
    crew: Crew;
    fuel: Fuel;
    frame: Frame;
    reactor: Reactor;
    engine: Engine;
    modules: Module[];
    mounts: Mount[];
    registration: ShipRegistration;
    cargo: Cargo;
}

interface ErrorMessage {
    message: string;
    code?: number;
}

interface FetchResponseType {
    data?: Ship[];
    error?: ErrorMessage;
}

interface ShipsState extends FetchResponseType {
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ShipsState = {
    data: undefined,
    status: 'idle',
    error: undefined,
};

export const fetchShips = createAsyncThunk(
    'ships/fetchShips',
    async (token: string) => {
        const rawFetchResponse = await fetch(
            'https://api.spacetraders.io/v2/my/ships',
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

const shipsSlice = createSlice({
    name: 'ships',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchShips.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchShips.fulfilled, (state, action) => {
                state.status = 'idle';
                state.data = action.payload.data;
            })
            .addCase(fetchShips.rejected, (state, action) => {
                state.status = 'failed';
                state.error = {
                    message: action.error.message as string,
                };
            });
    },
});

export const selectShips = createSelector(
    (state: RootState) => state.ships,
    (ships) => ships
);

export default shipsSlice.reducer;
