import styled from 'styled-components';
import { darken } from 'polished';
import ButtonTypes from './constants';

function backgroundColor(buttonType) {
    switch (buttonType) {
        case ButtonTypes.Register:
            return '#ee4d64';
        case ButtonTypes.Save:
            return '#ee4d64';
        case ButtonTypes.Back:
            return '#ddd';
        default:
            return '#ee4d64';
    }
}

export const Container = styled.button`
    border: 0;
    height: 36px;
    padding: 0 10px;
    border-radius: 4px;
    background: ${props => backgroundColor(props.buttonType)};
    transition: background 0.2s;
    &:hover {
        background: ${props => darken(0.08, backgroundColor(props.buttonType))};
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;

        > div {
            margin-right: 5px;
        }

        > strong {
            color: #fff;
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;
        }
    }
`;
