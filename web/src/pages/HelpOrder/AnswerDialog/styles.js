import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;

    p {
        margin-top: 20px;
        text-align: justify;
        font-size: 16px;
        margin-bottom: 20px;
    }

    textarea {
        margin-top: 5px;
        height: 120px;
        border-radius: 4px;
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 0.2);
        font-size: 16px;
        color: #999;
        padding: 10px 15px;
        resize: none;
    }

    span {
        color: #fb6f91;
        align-self: flex-start;
        margin: 0 0 10px;
    }

    > button {
        margin-top: 20px;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;

    > button {
        background: none;
        border: 0;
    }
`;
