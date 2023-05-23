import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import { styled } from 'styled-components';
import { useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import { useAppDispatch } from './app/hooks';
import {
    fetchUserProfile,
    selectUserProfile,
} from './features/userProfile/userProfileSlice';
import { useSelector } from 'react-redux';
import { fetchAgent } from './features/agent/agentSlice';
import WaypointInfoCard from './components/WaypointInfoCard';
import SystemInfoCard from './components/SystemInfoCard';
import ShipsInfoCard from './components/ShipsInfoCard';

const App = () => {
    const { user, isAuthenticated } = useContext(UserContext);
    const dispatch = useAppDispatch();

    const userProfile = useSelector(selectUserProfile);
    const token = userProfile?.token;

    useEffect(() => {
        if (token) {
            dispatch(fetchAgent(token));
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(
                fetchUserProfile({
                    email: user?.email as string,
                    sub: user?.sub as string,
                })
            );
        }
    }, [dispatch, user, isAuthenticated]);

    return (
        <Wrapper>
            <InnerWrapper>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route
                            path='/waypoint/:waypointSymbol'
                            element={<WaypointInfoCard />}
                        />
                        <Route
                            path='/system/:systemSymbol'
                            element={<SystemInfoCard />}
                        />
                        <Route path='/ships' element={<ShipsInfoCard />} />
                    </Routes>
                </BrowserRouter>
            </InnerWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 0 auto;
    max-width: 40rem;
`;

const InnerWrapper = styled.div`
    margin: 1rem;
`;

export default App;
