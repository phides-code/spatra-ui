import styled from 'styled-components';

interface TooltipProps {
    name: string;
    description: string;
    positionOffset: string;
    setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TooltipWrapperProps {
    positionoffset: string;
}

const Tooltip = ({
    name,
    description,
    positionOffset,
    setShowTooltip,
}: TooltipProps) => (
    <TooltipWrapper positionoffset={positionOffset}>
        <CloseButtonWrapper>
            <CloseButton
                onClick={() => {
                    setShowTooltip(false);
                }}
            >
                X
            </CloseButton>
        </CloseButtonWrapper>
        <div>{name}</div>
        <TraitDescription>
            <div>{description}</div>
        </TraitDescription>
    </TooltipWrapper>
);

const TooltipWrapper = styled.div<TooltipWrapperProps>`
    padding: 0.5rem;
    margin-left: 2rem;
    position: relative;
    top: ${(props) => props.positionoffset};
    right: 1rem;
    border: 1px solid darkgray;
    z-index: 999;
    background-color: black;
`;

const CloseButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const CloseButton = styled.button`
    background-color: black;
    color: darkgray;
`;

const TraitDescription = styled.div`
    padding-top: 0.5rem;
`;

export default Tooltip;
