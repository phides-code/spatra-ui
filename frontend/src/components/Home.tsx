import { useContext } from 'react';
import { UserContext } from '../UserContext';
import AgentInfoCard from './AgentInfoCard';
import { useSelector } from 'react-redux';
import { selectAgent } from '../features/agent/agentSlice';

const Home = () => {
    const { isAuthenticated } = useContext(UserContext);
    const agentState = useSelector(selectAgent);
    const agentFailed = agentState.status === 'failed';

    if (!isAuthenticated || agentFailed) return <div />;
    return <AgentInfoCard />;
};

export default Home;
