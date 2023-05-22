import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
    FetchSystemProps,
    fetchSystem,
    selectSystem,
} from '../features/system/systemSlice';
import { useAppDispatch } from '../app/hooks';
import { selectUserProfile } from '../features/userProfile/userProfileSlice';
import { useEffect } from 'react';
import InfoCard, { CardSectionData } from './InfoCard';

const SystemInfoCard = () => {
    const { systemSymbol } = useParams<{ systemSymbol: string }>();
    const systemState = useSelector(selectSystem);
    const waypoints = systemState.data;

    const dispatch = useAppDispatch();

    const userProfile = useSelector(selectUserProfile);
    const token = userProfile?.token as string;

    useEffect(() => {
        if (token && systemSymbol) {
            dispatch(fetchSystem({ systemSymbol, token } as FetchSystemProps));
        }
    }, [dispatch, token, systemSymbol]);

    const cardSectionData = waypoints?.map((waypoint, i) => ({
        name: waypoint.type,
        value: (
            <Link to={`/waypoint/${waypoint.symbol}`}>{waypoint.symbol}</Link>
        ),
    })) as CardSectionData[];

    if (!cardSectionData) return <div />;

    return <InfoCard header='System' cardSectionData={cardSectionData} />;
};

export default SystemInfoCard;
