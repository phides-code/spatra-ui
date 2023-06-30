import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';
import {
    fetchContract,
    selectContract,
} from '../features/contract/contractSlice';
import { selectUserProfile } from '../features/userProfile/userProfileSlice';
import { useEffect } from 'react';
import InfoCard, { CardSectionData } from './InfoCard';

const ContractInfoCard = () => {
    const dispatch = useAppDispatch();

    const { contractId } = useParams<{ contractId: string }>();

    const userProfile = useSelector(selectUserProfile);
    const token = userProfile?.token as string;

    const contractState = useSelector(selectContract);
    const contract = contractState.data;

    useEffect(() => {
        if (token && contractId) {
            dispatch(
                fetchContract({
                    token,
                    contractId,
                })
            );
        }
    }, [contractId, dispatch, token]);

    const cardSectionData = [
        {
            name: 'Status:',
            value: (
                <>
                    <div>
                        {contract?.accepted ? 'Accepted' : 'Not Accepted'}
                    </div>
                    <div>
                        {contract?.fulfilled ? 'Fulfilled' : 'Not Fulfilled'}
                    </div>
                </>
            ),
        },
        {
            name: 'Deadline:',
            value:
                new Date(contract?.expiration as string).toDateString() +
                ' - ' +
                new Date(contract?.expiration as string).toLocaleTimeString(),
        },
        {
            name: 'Faction:',
            value: contract?.factionSymbol as string,
        },
        {
            name: 'Payment:',
            value: (
                <>
                    <div>
                        On Acceptance: {contract?.terms.payment.onAccepted}
                    </div>
                    <div>
                        On Fulfillment: {contract?.terms.payment.onFulfilled}
                    </div>
                </>
            ),
        },
    ] as CardSectionData[];

    contract?.terms.deliver.forEach((item) => {
        cardSectionData.push({
            name: 'Deliver:',
            value: item.tradeSymbol,
        });

        cardSectionData.push({
            name: 'Units:',
            value: item.unitsFulfilled + ' / ' + item.unitsRequired,
        });

        cardSectionData.push({
            name: 'Destination:',
            value: (
                <Link to={`/waypoint/${item.destinationSymbol}`}>
                    {item.destinationSymbol}
                </Link>
            ),
        });
    });

    return (
        <InfoCard
            header={contract?.type as string}
            cardSectionData={cardSectionData}
        />
    );
};

export default ContractInfoCard;
