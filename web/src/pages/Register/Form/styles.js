import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 900px;

    div form {
        display: flex;
        flex-direction: column;

        span {
            color: #de3b3b;
            align-self: flex-start;
            margin-top: 2px;
        }

        label:not(:first-child) {
            margin-top: 10px;
        }
    }
`;

export const InputGridContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
`;

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    &:not(:first-child) {
        margin-left: 10px;
    }

    input[disabled] {
        background: #ddd;
    }
`;
