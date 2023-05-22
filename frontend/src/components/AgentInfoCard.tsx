import { useSelector } from 'react-redux';
import { selectAgent } from '../features/agent/agentSlice';
import InfoCard, { CardSectionData } from './InfoCard';
import { Link } from 'react-router-dom';

const AgentInfoCard = () => {
    const agentState = useSelector(selectAgent);
    const agent = agentState.data;

    const cardSectionData = [
        { name: 'Symbol', value: agent?.symbol },
        {
            name: 'Headquarters',
            value: (
                <Link to={`/waypoint/${agent?.headquarters}`}>
                    {agent?.headquarters}
                </Link>
            ),
        },
        { name: 'Credits', value: agent?.credits },
    ] as CardSectionData[];

    return <InfoCard header='Agent' cardSectionData={cardSectionData} />;
};

export default AgentInfoCard;
