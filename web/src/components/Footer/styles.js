import styled from 'styled-components';

export const Container = styled.div`
    padding-top: 10px;
    border-top: 1px solid #e3e3e3;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    strong {
        color: #999;
    }

    button {
        cursor: pointer;
        border: 0;
        background: #ee4d64;
        border-radius: 4px;
        margin: 0 20px;

        &[disabled] {
            cursor: unset;
            background: rgba(0, 0, 0, 0.3);
        }

        svg {
            padding-top: 3px;
        }
    }
`;
