import { useSelector } from 'react-redux';
import { fetchShips, selectShips } from '../features/ships/shipsSlice';
import { useAppDispatch } from '../app/hooks';
import { selectUserProfile } from '../features/userProfile/userProfileSlice';
import { useEffect } from 'react';
import InfoCard, { CardSectionData } from './InfoCard';

const ShipsInfoCard = () => {
    const shipsState = useSelector(selectShips);
    const ships = shipsState.data;

    const dispatch = useAppDispatch();

    const userProfile = useSelector(selectUserProfile);
    const token = userProfile?.token as string;

    useEffect(() => {
        if (token) {
            dispatch(fetchShips(token));
        }
    }, [dispatch, token]);

    const cardSectionData = ships?.map((ship, i) => ({
        name: ship.registration.role,
        value: ship.registration.name,
    })) as CardSectionData[];

    if (!cardSectionData) return <div />;

    return <InfoCard header='Ships' cardSectionData={cardSectionData} />;
};

export default ShipsInfoCard;
