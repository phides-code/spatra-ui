import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useSelector } from 'react-redux';
import { selectAgent } from '../features/agent/agentSlice';

const Home = () => {
    const { isAuthenticated } = useContext(UserContext);
    const agent = useSelector(selectAgent);

    if (!isAuthenticated) return <div />;
    return (
        <div>
            <div>{agent?.symbol}</div>
            <div>{agent?.headquarters}</div>
            <div>{agent?.credits}</div>
        </div>
    );
};

export default Home;
