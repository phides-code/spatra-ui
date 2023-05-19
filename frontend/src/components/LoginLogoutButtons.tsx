import { useAuth0 } from '@auth0/auth0-react';
import { styled } from 'styled-components';

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <StyledButton onClick={() => loginWithRedirect()}>Log In</StyledButton>
    );
};

export const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <StyledButton
            onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
            }
        >
            Log Out
        </StyledButton>
    );
};

const StyledButton = styled.button`
    color: darkgrey;
    background: black;
`;
