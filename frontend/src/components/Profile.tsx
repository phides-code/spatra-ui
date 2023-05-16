import { useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useAppDispatch } from '../app/hooks';
import {
    ProfileUpdate,
    selectUserProfile,
    updateUserProfile,
} from '../features/userProfile/userProfileSlice';
import { UserContext } from '../UserContext';
import { useSelector } from 'react-redux';
import { selectAgent, fetchAgent } from '../features/agent/agentSlice';

const Profile = () => {
    const { user, isAuthenticated } = useContext(UserContext);

    const dispatch = useAppDispatch();

    const userProfile = useSelector(selectUserProfile);
    const agent = useSelector(selectAgent);
    const symbol = agent?.symbol;
    const accountId = agent?.accountId;

    const [token, setToken] = useState<string>('');

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
            <ProfileSection>
                <ProfileSectionLabel>Token:</ProfileSectionLabel>
                <div>
                    <StyledTextarea
                        name='token'
                        value={token as string}
                        onBlur={(ev) => handleBlur(ev.target)}
                        onChange={(ev) => handleChange(ev.target)}
                    />
                </div>
            </ProfileSection>
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
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 24rem;
`;

const ProfileValue = styled.div`
    width: 16rem;
    background: black;
    color: white;
    border: 1px solid grey;
    min-height: 1rem;
`;

const StyledTextarea = styled.textarea`
    width: 16rem;
    height: 16rem;
    background: black;
    color: white;
    border: 1px solid grey;
`;

const ProfileSectionLabel = styled.div`
    margin-right: 1rem;
`;

const ProfileSection = styled.div`
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
`;

export default Profile;
