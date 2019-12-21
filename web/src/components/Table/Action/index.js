import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const ActionType = {
    edit: 'editar',
    delete: 'apagar',
    answer: 'responder',
};

export default function Action({ onClick, type, color }) {
    function handleClick() {
        let res = false;
        if (onClick) {
            switch (type) {
                case ActionType.delete:
                    res = confirm('Tem certeza que deseja excluir esse registro?'); //eslint-disable-line
                    if (res) {
                        onClick.call(null);
                    }
                    break;
                default:
                    onClick.call(null);
                    break;
            }
        }
    }

    return (
        <Container type="button" onClick={handleClick} color={color}>
            {type}
        </Container>
    );
}

Action.propTypes = {
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

Action.ActionType = ActionType;
