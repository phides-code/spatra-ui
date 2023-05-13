import { useContext } from 'react';
import { UserContext } from '../UserContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LoginButton, LogoutButton } from './LoginLogoutButtons';

const Header = () => {
    const { user, isAuthenticated } = useContext(UserContext);

    return (
        <Wrapper>
            <StyledLink to='/'>spatra-ui</StyledLink>
            {isAuthenticated ? (
                <>
                    <StyledLink to='/profile'>{user?.nickname}</StyledLink>
                    <LogoutButton />
                </>
            ) : (
                <LoginButton />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
`;

export default Header;
