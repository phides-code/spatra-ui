import { useContext } from 'react';
import { UserContext } from '../UserContext';

const Home = () => {
    const { isAuthenticated } = useContext(UserContext);

    if (!isAuthenticated) return <div />;

    return <div></div>;
};

export default Home;
