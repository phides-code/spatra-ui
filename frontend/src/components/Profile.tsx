import { useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useAppDispatch } from '../app/hooks';
import {
    ProfileUpdate,
    selectUserProfile,
    updateUserProfile,
} from '../features/userProfile/userProfileSlice';
import { UserContext } from '../common/UserContext';
import { useSelector } from 'react-redux';
import { selectAgent, fetchAgent } from '../features/agent/agentSlice';
import RegisterAgent from './RegisterAgent';

const Profile = () => {
    const dispatch = useAppDispatch();

    const [token, setToken] = useState<string>('');
    const [showRegisterAgent, setShowRegisterAgent] = useState(true);

    const { user, isAuthenticated } = useContext(UserContext);
    const userProfile = useSelector(selectUserProfile);
    const agentState = useSelector(selectAgent);
    const agent = agentState.data;
    const agentFailed = agentState.status === 'failed';
    const symbol = agent?.symbol;
    const accountId = agent?.accountId;

    const handleBlur = async (target: EventTarget & HTMLTextAreaElement) => {
        const update: ProfileUpdate = {
            token: target.value,
        };

        const email = user?.email as string;
        const sub = user?.sub as string;

        const result = await dispatch(
            updateUserProfile({ email, sub, update })
        );

        if (result) {
            await dispatch(fetchAgent(token));
        }
    };

    const handleChange = (target: EventTarget & HTMLTextAreaElement) =>
        setToken(target.value);

    useEffect(() => {
        if (userProfile?.token) {
            setToken(userProfile.token);
        }
    }, [userProfile]);

    if (!isAuthenticated || !userProfile) {
        return <div />;
    }

    return (
        <Wrapper>
            {showRegisterAgent && (
                <RegisterAgent setShowRegisterAgent={setShowRegisterAgent} />
            )}
            <ProfileSection>
                <ProfileSectionLabel>Token:</ProfileSectionLabel>
                <div>
                    <StyledTextarea
                        name='token'
                        value={token as string}
                        onBlur={(ev: React.FocusEvent<HTMLTextAreaElement>) =>
                            handleBlur(ev.target)
                        }
                        onChange={(
                            ev: React.ChangeEvent<HTMLTextAreaElement>
                        ) => handleChange(ev.target)}
                    />
                </div>
            </ProfileSection>
            {/* <ProfileSection>
                <ProfileSectionLabel>Agent Symbol:</ProfileSectionLabel>
                <div>
                    <ProfileValue>{symbol}</ProfileValue>
                </div>
            </ProfileSection>
            <ProfileSection>
                <ProfileSectionLabel>AccountID:</ProfileSectionLabel>
                <div>
                    <ProfileValue>{accountId}</ProfileValue>
                </div>
            </ProfileSection> */}
            {agentFailed ? (
                <ErrorMessage>{agentState.error?.message}</ErrorMessage>
            ) : (
                <div>
                    <div>Token confirmed!</div>
                    <ProfileSection>
                        <ProfileSectionLabel>Agent Symbol:</ProfileSectionLabel>
                        <div>
                            <ProfileValue>{symbol}</ProfileValue>
                        </div>
                    </ProfileSection>
                    <ProfileSection>
                        <ProfileSectionLabel>AccountID:</ProfileSectionLabel>
                        <div>
                            <ProfileValue>{accountId}</ProfileValue>
                        </div>
                    </ProfileSection>
                </div>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 24rem;
`;

const ProfileSectionLabel = styled.div`
    margin-right: 1rem;
`;

const StyledTextarea = styled.textarea`
    width: 16rem;
    height: 16rem;
    background: black;
    color: darkgray;
    border: 1px solid darkgray;
`;

const ProfileSection = styled.div`
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
`;

const ProfileValue = styled.div`
    width: 14rem;
    background: black;
    color: darkgray;
    border: 1px solid darkgray;
    min-height: 1rem;
`;

const ErrorMessage = styled.div`
    color: darkred;
`;

export default Profile;
