import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import {
    fetchMyContracts,
    selectMyContracts,
} from '../features/contracts/contractsSlice';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../features/userProfile/userProfileSlice';
import { Link } from 'react-router-dom';
import InfoCard, { CardSectionData } from './InfoCard';

const MyContracts = () => {
    const dispatch = useAppDispatch();

    const userProfile = useSelector(selectUserProfile);
    const token = userProfile?.token as string;

    const myContractsState = useSelector(selectMyContracts);
    const myContracts = myContractsState.data;

    useEffect(() => {
        if (token) {
            dispatch(fetchMyContracts(token));
        }
    }, [dispatch, token]);

    const cardSectionData = myContracts?.map((contract) => ({
        name: (
            <>
                <Link to={`/contract/${contract.id}`}>
                    {contract.type}
                    <div>
                        {contract.terms.deliver.map((item) => item.tradeSymbol)}
                    </div>
                </Link>
            </>
        ),

        value: (
            <div>
                {contract.terms.payment.onFulfilled.toString()}
                <div>
                    {!contract.accepted && 'Not '}
                    Accepted
                </div>
            </div>
        ),
    })) as CardSectionData[];

    if (!myContracts || myContracts?.length === 0)
        return <div>No contracts</div>;

    return <InfoCard header='My Contracts' cardSectionData={cardSectionData} />;
};

export default MyContracts;
