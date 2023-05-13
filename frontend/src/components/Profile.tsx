import { styled } from 'styled-components';

const Profile = () => {
    const handleBlur = (
        target:
            | (EventTarget & HTMLInputElement)
            | (EventTarget & HTMLTextAreaElement)
    ) => {
        const { name, value } = target;

        console.log('name: ' + name);
        console.log('value: ' + value);
    };

    return (
        <div>
            <ProfileSection>
                <ProfileSectionLabel>Agent:</ProfileSectionLabel>
                <div>
                    <StyledInput
                        name='agent'
                        onBlur={(ev) => handleBlur(ev.target)}
                    />
                </div>
            </ProfileSection>
            <ProfileSection>
                <ProfileSectionLabel>Token:</ProfileSectionLabel>
                <div>
                    <StyledTextarea
                        name='token'
                        onBlur={(ev) => handleBlur(ev.target)}
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
