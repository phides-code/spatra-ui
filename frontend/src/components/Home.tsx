import { useContext } from 'react';
import { UserContext } from '../UserContext';
import AgentInfoCard from './AgentInfoCard';

const Home = () => {
    const { isAuthenticated } = useContext(UserContext);

    if (!isAuthenticated) return <div />;
    return <AgentInfoCard />;
};

export default Home;
