import styled from 'styled-components';

interface RegisterAgentProps {
    setShowRegisterAgent: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterAgent = ({ setShowRegisterAgent }: RegisterAgentProps) => {
    return (
        <Wrapper>
            <ButtonWrapper>
                <StyledButton
                    onClick={() => {
                        setShowRegisterAgent(false);
                    }}
                >
                    X
                </StyledButton>
            </ButtonWrapper>
            <RegistrationSection>Register a new agent</RegistrationSection>
            <RegistrationSection>
                <label>Callsign:</label>
                <StyledInput />
            </RegistrationSection>
            <RegistrationSection>
                <label>Faction (optional):</label>
                <StyledInput />
            </RegistrationSection>
            <StyledButton>Submit</StyledButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 0.5rem;
    margin-left: 2rem;
    position: absolute;
    border: 1px solid darkgray;
    z-index: 999;
    background-color: black;
    overflow-x: hidden;
`;

const ButtonWrapper = styled.div`
    position: relative;
    left: 10.5rem;
`;

const RegistrationSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
`;

const StyledButton = styled.button`
    background-color: black;
    color: darkgray;
`;

const StyledInput = styled.input`
    margin-top: 0.4rem;
    margin-left: 0.4rem;
    background-color: black;
    color: darkgray;
`;

export default RegisterAgent;
