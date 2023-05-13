import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import { styled } from 'styled-components';

const App = () => {
    return (
        <Wrapper>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 1rem;
`;

export default App;
