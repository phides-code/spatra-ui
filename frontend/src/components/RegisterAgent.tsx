import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../app/hooks';
import {
    FactionSymbol,
    fetchFactions,
    selectFactions,
} from '../features/factions/factionsSlice';
import { useSelector } from 'react-redux';
import {
    Registration,
    postRegistration,
    selectRegistration,
} from '../features/registration/registrationSlice';
import { fetchAgent } from '../features/agent/agentSlice';

interface RegisterAgentProps {
    setShowRegisterAgent: React.Dispatch<React.SetStateAction<boolean>>;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    updateProfileWithToken: (token: string) => Promise<void>;
}

const RegisterAgent = ({
    setShowRegisterAgent,
    setToken,
    updateProfileWithToken,
}: RegisterAgentProps) => {
    const dispatch = useAppDispatch();

    const [callsign, setCallsign] = useState('');
    const [selectedFaction, setFaction] = useState<FactionSymbol>('COSMIC');

    const registrationState = useSelector(selectRegistration);
    const errorState = registrationState.status === 'failed';
    const loading = registrationState.status === 'loading';

    const factionsState = useSelector(selectFactions);
    const factions = factionsState.factions;

    const factionNames = factions?.map((faction) => (
        <option key={faction._id} value={faction.symbol}>
            {faction.name}
        </option>
    ));

    const handleCallsignChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCallsign(event.target.value);
    };

    const handleFactionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFaction(event.target.value as FactionSymbol);
    };

    const submitRegistration = async (event: React.FormEvent) => {
        event.preventDefault();

        const registration = await dispatch(
            postRegistration({ callsign, faction: selectedFaction })
        );

        const registrationPayload = registration.payload as {
            data: Registration;
        };

        if (registrationPayload) {
            setToken(registrationPayload.data.token);
            updateProfileWithToken(registrationPayload.data.token);
            dispatch(fetchAgent(registrationPayload.data.token));
            setShowRegisterAgent(false);
        }
    };

    useEffect(() => {
        dispatch(fetchFactions());
    }, [dispatch]);

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
            <form onSubmit={submitRegistration}>
                <RegistrationSection>
                    <label>Callsign:</label>
                    <StyledInput
                        value={callsign}
                        onChange={handleCallsignChange}
                    />
                </RegistrationSection>
                <RegistrationSection>
                    <label>Faction:</label>
                    <StyledSelect
                        value={selectedFaction}
                        onChange={handleFactionChange}
                    >
                        {factionNames}
                    </StyledSelect>
                </RegistrationSection>
                <RegistrationSection>
                    <StyledButton
                        disabled={
                            callsign === '' || callsign.includes(' ') || loading
                        }
                    >
                        {loading ? '...' : 'Submit'}
                    </StyledButton>
                </RegistrationSection>
            </form>
            {errorState && (
                <RegistrationSection>
                    <ErrorMessage>
                        {registrationState.error?.message}
                    </ErrorMessage>
                </RegistrationSection>
            )}
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
    max-width: 13rem;
`;

const StyledSelect = styled.select`
    background: black;
    color: darkgray;
`;

const ButtonWrapper = styled.div`
    position: relative;
    left: 11.5rem;
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

const ErrorMessage = styled.div`
    color: darkred;
`;

export default RegisterAgent;
