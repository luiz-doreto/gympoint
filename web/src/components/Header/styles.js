import styled from 'styled-components';

export const Container = styled.div`
    background: #fff;
    height: 64px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
        display: flex;
        align-items: center;

        img {
            margin-right: 20px;
            padding-right: 20px;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
        }

        a {
            color: #999;
            font-size: 15px;
            font-weight: bold;
            text-transform: uppercase;
            margin-right: 15px;
        }
    }

    aside {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        button {
            border: 0;
            background: none;
            color: #de3b3b;
        }
    }
`;
