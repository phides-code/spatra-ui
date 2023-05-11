import { useContext } from 'react';
import { UserContext } from '../UserContext';

const Home = () => {
    const { user, isAuthenticated } = useContext(UserContext);

    if (!isAuthenticated) return <div />;

    return <div>Hello {user?.nickname}</div>;
};

export default Home;
