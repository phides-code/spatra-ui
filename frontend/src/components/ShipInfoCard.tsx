import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
    FetchShipProps,
    fetchShip,
    selectShip,
} from '../features/ship/shipSlice';
import { selectUserProfile } from '../features/userProfile/userProfileSlice';
import { useAppDispatch } from '../app/hooks';
import { useEffect, useState } from 'react';
import InfoCard, { CardSectionData } from './InfoCard';
import { Frame } from '../features/ships/shipsSlice';
import Tooltip from '../common/Tooltip';
import styled from 'styled-components';

const ShipInfoCard = () => {
    const { shipSymbol } = useParams<{ shipSymbol: string }>();
    const shipState = useSelector(selectShip);
    const ship = shipState.data;

    const dispatch = useAppDispatch();

    const userProfile = useSelector(selectUserProfile);
    const token = userProfile?.token as string;

    const [showTooltip, setShowTooltip] = useState(false);
    const [selectedClickableItem, setSelectedClickableItem] = useState<Frame>();

    const handleTooltipClick = (clickableItem: Frame) => {
        setShowTooltip(true);
        setSelectedClickableItem(clickableItem);
    };

    useEffect(() => {
        if (token && shipSymbol) {
            dispatch(fetchShip({ shipSymbol, token } as FetchShipProps));
        }
    }, [dispatch, token, shipSymbol]);

    const cardSectionData = [
        {
            name: 'Type',
            value: (
                <Link
                    to='#'
                    onClick={() => handleTooltipClick(ship?.frame as Frame)}
                >
                    {ship?.frame.name.split(' ')[1]}
                </Link>
            ),
        },
        {
            name: 'Waypoint',
            value: (
                <Link to={`/waypoint/${ship?.nav.waypointSymbol}`}>
                    {ship?.nav.waypointSymbol}
                </Link>
            ),
        },
        { name: 'Status', value: ship?.nav.status },
        {
            name: 'Fuel',
            value:
                ship?.fuel.current &&
                ship?.fuel.capacity &&
                `${ship?.fuel.current} / ${ship?.fuel.capacity}`,
        },
        {
            name: 'Crew',
            value:
                ship?.crew.current &&
                ship?.crew.capacity &&
                `${ship?.crew.current} / ${ship?.crew.capacity}`,
        },
        {
            name: 'Cargo',
            value:
                ship?.cargo.units &&
                ship?.cargo.capacity &&
                `${ship?.cargo.units} / ${ship?.cargo.capacity}`,
        },
    ] as CardSectionData[];

    if (!cardSectionData) return <div />;

    return (
        <Wrapper>
            <InfoCard
                header={
                    ship?.registration.role
                        ? `${ship?.registration.role} Ship - ${shipSymbol}`
                        : ''
                }
                cardSectionData={cardSectionData}
            />
            {showTooltip && (
                <Tooltip
                    name={selectedClickableItem?.name.split(' ')[1] as string}
                    description={selectedClickableItem?.description as string}
                    positionOffset='-8rem'
                    setShowTooltip={setShowTooltip}
                />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default ShipInfoCard;
