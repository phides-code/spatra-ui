import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const Header = () => {
    const { isAuthenticated } = useContext(UserContext);

    return (
        <Wrapper>
            <Link to='/'>spatra-ui</Link>
            {isAuthenticated ? (
                <>
                    <Link to='/profile'>Profile</Link>
                    <LogoutButton />
                </>
            ) : (
                <LoginButton />
            )}
        </Wrapper>
    );
};

export default Header;
