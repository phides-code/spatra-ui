import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Link to='#' onClick={() => loginWithRedirect()}>
            Login
        </Link>
    );
};

export const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Link
            to='#'
            onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
            }
        >
            Logout
        </Link>
    );
};
