import { useSelector } from 'react-redux';
import { selectAgent } from '../features/agent/agentSlice';
import InfoCard, { CardSectionData } from './InfoCard';

const AgentInfoCard = () => {
    const agent = useSelector(selectAgent);

    const cardSectionData = [
        { name: 'Symbol', value: agent?.symbol },
        { name: 'Headquarters', value: agent?.headquarters },
        { name: 'Credits', value: agent?.credits },
    ] as CardSectionData[];

    return <InfoCard header='Agent' cardSectionData={cardSectionData} />;
};

export default AgentInfoCard;
