import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    > strong {
        font-size: 24px;
    }

    > div {
        display: flex;
        align-items: center;

        > button {
            margin-left: 10px;
        }
    }

    div input {
        margin-left: 10px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        height: 36px;
        padding: 10px 20px;
    }
`;
