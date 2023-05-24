import { useEffect, useState } from 'react';
import InfoCard, { CardSectionData } from './InfoCard';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import {
    FetchWaypointProps,
    Trait,
    fetchWaypoint,
    selectWaypoint,
} from '../features/waypoint/waypointSlice';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../features/userProfile/userProfileSlice';
import { styled } from 'styled-components';
import Tooltip from '../common/Tooltip';

const WaypointInfoCard = () => {
    const { waypointSymbol } = useParams<{ waypointSymbol: string }>();
    const waypointState = useSelector(selectWaypoint);
    const waypoint = waypointState.data;

    const dispatch = useAppDispatch();

    const userProfile = useSelector(selectUserProfile);
    const token = userProfile?.token as string;

    const [showTraitInfoBox, setShowTraitInfoBox] = useState(false);
    const [selectedTrait, setSelectedTrait] = useState<Trait>();

    const handleTraitClick = (trait: Trait) => {
        setShowTraitInfoBox(true);
        setSelectedTrait(trait);
    };

    useEffect(() => {
        if (token && waypointSymbol) {
            dispatch(
                fetchWaypoint({ waypointSymbol, token } as FetchWaypointProps)
            );
        }
    }, [dispatch, token, waypointSymbol]);

    const cardSectionData = [
        {
            name: 'System Symbol',
            value: (
                <Link to={`/system/${waypoint?.systemSymbol}`}>
                    {waypoint?.systemSymbol}
                </Link>
            ),
        },
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
                <div key={trait.symbol + i}>
                    <Link
                        to='#'
                        onClick={() => {
                            handleTraitClick(trait);
                        }}
                    >
                        {trait.name}
                    </Link>
                </div>
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

    if (!cardSectionData) return <div />;

    return (
        <Wrapper>
            <InfoCard header='Waypoint' cardSectionData={cardSectionData} />
            {showTraitInfoBox && (
                <Tooltip
                    name={selectedTrait?.name as string}
                    description={selectedTrait?.description as string}
                    positionOffset='-18rem'
                    setShowTooltip={setShowTraitInfoBox}
                />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default WaypointInfoCard;
