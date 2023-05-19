import styled from 'styled-components';

export interface CardSectionData {
    name: string;
    value: string;
}

interface InfoCardProps {
    header: string;
    cardSectionData: CardSectionData[];
}

const InfoCard = ({ header, cardSectionData }: InfoCardProps) => {
    return (
        <Wrapper>
            <CardHeader>{header}</CardHeader>

            {cardSectionData.map((cardSection, i) => (
                <CardSection key={cardSection.name + i}>
                    {`${cardSection.name}: `}
                    <CardSectionValue>{cardSection.value}</CardSectionValue>
                </CardSection>
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 16rem;
    border: 1px solid gray;
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    padding: 0.2rem;
`;

const CardSection = styled.div`
    padding: 0.2rem;
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
`;

const CardSectionValue = styled.div``;

export default InfoCard;
