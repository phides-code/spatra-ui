import { useContext, useState } from 'react';
import { UserContext } from '../common/UserContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LoginButton, LogoutButton, SignupButton } from './LoginLogoutButtons';

interface MenuItemProps {
    name: string;
    destination: string;
}

const Header = () => {
    const { isAuthenticated } = useContext(UserContext);
    const [showMenu, setShowMenu] = useState(false);

    const MenuItem = ({ name, destination }: MenuItemProps) => (
        <MenuItemWrapper>
            <Link
                to={destination}
                onClick={() => {
                    setShowMenu(false);
                }}
            >
                {name}
            </Link>
        </MenuItemWrapper>
    );

    const Menu = () => (
        <MenuWrapper>
            <CloseButton
                onClick={() => {
                    setShowMenu(false);
                }}
            >
                X
            </CloseButton>
            <MenuItem name='Profile' destination='/profile' />
            <MenuItem name='Ships' destination='/ships' />
            <MenuItem name='Contracts' destination='#' />
            <MenuItemWrapper>
                <LogoutButton />
            </MenuItemWrapper>
        </MenuWrapper>
    );

    return (
        <Wrapper>
            <Link to='/'>spatra-ui</Link>
            {isAuthenticated ? (
                <>
                    {showMenu ? (
                        <Menu />
                    ) : (
                        <Link
                            to='#'
                            onClick={() => {
                                setShowMenu(true);
                            }}
                        >
                            Menu
                        </Link>
                    )}
                </>
            ) : (
                <>
                    <LoginButton />
                    <SignupButton />
                </>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    max-height: 1rem;
`;

const MenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0.5rem;
    position: relative;
    right: 0.5rem;
    width: 6rem;
    height: 100%;
    border: 1px solid darkgray;
    z-index: 999;
    background-color: black;
`;

const CloseButton = styled.button`
    background-color: black;
    color: darkgray;
`;

const MenuItemWrapper = styled.div`
    margin-top: 0.5rem;
`;

export default Header;
