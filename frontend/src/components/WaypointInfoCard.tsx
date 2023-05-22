import { useEffect } from 'react';
import InfoCard, { CardSectionData } from './InfoCard';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import {
    FetchWaypointProps,
    fetchWaypoint,
    selectWaypoint,
} from '../features/waypoint/waypointSlice';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../features/userProfile/userProfileSlice';

const WaypointInfoCard = () => {
    const { waypointSymbol } = useParams<{ waypointSymbol: string }>();
    const waypointState = useSelector(selectWaypoint);
    const waypoint = waypointState.data;

    const dispatch = useAppDispatch();

    const userProfile = useSelector(selectUserProfile);
    const token = userProfile?.token as string;

    useEffect(() => {
        if (token) {
            dispatch(
                fetchWaypoint({ waypointSymbol, token } as FetchWaypointProps)
            );
        }
    }, [dispatch, token, waypointSymbol]);

    const cardSectionData = [
        { name: 'System Symbol', value: waypoint?.systemSymbol },
        { name: 'Symbol', value: waypoint?.symbol },
        { name: 'Type', value: waypoint?.type },
        { name: 'X', value: waypoint?.x },
        { name: 'Y', value: waypoint?.y },
        {
            name: 'Orbitals',
            value: waypoint?.orbitals.map((orbital, i) => (
                <div key={orbital.symbol + i}>
                    <Link to={`/waypoint/${orbital.symbol}`}>
                        {orbital.symbol}
                    </Link>
                </div>
            )),
        },
        {
            name: 'Traits',
            value: waypoint?.traits.map((trait, i) => (
                <div key={trait.symbol + i}>{trait.name}</div>
            )),
        },
        { name: 'Submitted By', value: waypoint?.chart.submittedBy },
        {
            name: 'Submitted On',
            value: new Date(
                waypoint?.chart.submittedOn as string
            ).toDateString(),
        },
        { name: 'Faction Symbol', value: waypoint?.faction.symbol },
    ] as CardSectionData[];

    return <InfoCard header='Waypoint' cardSectionData={cardSectionData} />;
};

export default WaypointInfoCard;
