import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './common/UserContext';

const container = document.getElementById('root')!;
const root = createRoot(container);

const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN as string;
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID as string;

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Auth0Provider
                domain={AUTH0_DOMAIN}
                clientId={AUTH0_CLIENT_ID}
                authorizationParams={{
                    redirect_uri: window.location.origin,
                }}
            >
                <UserProvider>
                    <App />
                </UserProvider>
            </Auth0Provider>
        </Provider>
    </React.StrictMode>
);
