import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import { styled } from 'styled-components';
import { useContext, useEffect } from 'react';
import { UserContext } from './common/UserContext';
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
import ShipInfoCard from './components/ShipInfoCard';
import MyContracts from './components/MyContracts';
import ContractInfoCard from './components/ContractInfoCard';

const App = () => {
    const { user, isAuthenticated } = useContext(UserContext);
    const dispatch = useAppDispatch();

    const userProfile = useSelector(selectUserProfile);
    const token = userProfile?.token;

    useEffect(() => {
        if (token) {
            dispatch(fetchAgent(token as string));
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
                    {!token && isAuthenticated ? (
                        <Profile />
                    ) : (
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
                            <Route
                                path='/ship/:shipSymbol'
                                element={<ShipInfoCard />}
                            />
                            <Route
                                path='/mycontracts'
                                element={<MyContracts />}
                            />
                            <Route
                                path='/contract/:contractId'
                                element={<ContractInfoCard />}
                            />
                        </Routes>
                    )}
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
