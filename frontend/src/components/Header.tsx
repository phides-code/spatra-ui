import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const Header = () => {
    const { isAuthenticated } = useContext(UserContext);

    return <div>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>;
};

export default Header;
