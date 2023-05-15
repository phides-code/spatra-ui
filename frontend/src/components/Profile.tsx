import { useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useAppDispatch } from '../app/hooks';
import {
    ProfileUpdate,
    fetchUserProfile,
    selectUserProfile,
    updateUserProfile,
} from '../features/userProfile/userProfileSlice';
import { UserContext } from '../UserContext';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { user, isAuthenticated } = useContext(UserContext);

    const dispatch = useAppDispatch();

    const userProfile = useSelector(selectUserProfile);

    const [agent, setAgent] = useState<string>('');
    const [token, setToken] = useState<string>('');

    const handleBlur = (
        target:
            | (EventTarget & HTMLInputElement)
            | (EventTarget & HTMLTextAreaElement)
    ) => {
        const { name, value } = target;

        const update: ProfileUpdate = {
            [name]: value,
        };

        const email = user?.email as string;
        const sub = user?.sub as string;

        dispatch(updateUserProfile({ email, sub, update }));
    };

    const handleChange = (
        target:
            | (EventTarget & HTMLInputElement)
            | (EventTarget & HTMLTextAreaElement)
    ) => {
        const { name, value } = target;

        switch (name) {
            case 'agent':
                setAgent(value);
                break;
            case 'token':
                setToken(value);
                break;
        }
    };

    useEffect(() => {
        if (userProfile?.agent) {
            setAgent(userProfile.agent);
        }
        if (userProfile?.token) {
            setToken(userProfile.token);
        }
    }, [userProfile]);

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

    if (!isAuthenticated || !userProfile) {
        return <div />;
    }

    return (
        <div>
            <ProfileSection>
                <ProfileSectionLabel>Agent:</ProfileSectionLabel>
                <div>
                    <StyledInput
                        name='agent'
                        value={agent as string}
                        onBlur={(ev) => handleBlur(ev.target)}
                        onChange={(ev) => handleChange(ev.target)}
                    />
                </div>
            </ProfileSection>
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
        </div>
    );
};

const StyledInput = styled.input`
    width: 16rem;
    background: black;
    color: white;
    border: 1px solid grey;
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
`;

export default Profile;
