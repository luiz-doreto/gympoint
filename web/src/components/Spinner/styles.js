import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const SpinnerIcon = styled(FaSpinner)`
    align-self: center;
    animation: ${rotate} 2s linear infinite;
`;
