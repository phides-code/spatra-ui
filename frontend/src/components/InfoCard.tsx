import styled from 'styled-components';

export interface CardSectionData {
    name: string;
    value: string | JSX.Element;
}

interface InfoCardProps {
    header: string;
    cardSectionData: CardSectionData[];
}

const InfoCard = ({ header, cardSectionData }: InfoCardProps) => {
    if (!cardSectionData.length) return <div />;

    return (
        <Wrapper>
            <CardHeader>{header}</CardHeader>
            <CardBody>
                {cardSectionData.map((cardSection, i) => (
                    <CardSection key={cardSection.name + i}>
                        {`${cardSection.name}: `}
                        <CardSectionValue>{cardSection.value}</CardSectionValue>
                    </CardSection>
                ))}
            </CardBody>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 40rem;
    border: 1px solid darkgray;
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid darkgray;
    padding: 0.2rem;
`;

const CardBody = styled.div`
    padding: 0.5rem;
`;

const CardSection = styled.div`
    display: flex;
    margin-bottom: 0.5rem;
    justify-content: space-between;
`;

const CardSectionValue = styled.div``;

export default InfoCard;
